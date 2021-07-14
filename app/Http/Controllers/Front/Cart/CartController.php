<?php

namespace App\Http\Controllers\Front\Cart;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Front\Order\AttributeIdRequest;
use App\Http\Requests\Front\Order\CreateOrderRequest;
use App\Http\Requests\Front\Order\EditOrderRequest;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    use ResponseTrait;

    const CART_SESSION_ID = 'cart';

    function orderCreate()
    {

    }

    function destroy(AttributeIdRequest $request)
    {
        Session::put(self::CART_SESSION_ID,$this->removeByAttributeId($request->input('attributeId'), $this->getCart()));
            return success(Session::get(self::CART_SESSION_ID));
    }

    function index()
    {
        $cart = $this->getCart();
        if (empty($cart))
            return $this->message(__('message.cart.checkout.error.empty'))->error();

        $items = $this->groupByAttributeIds($cart);

        $attributeIds = Arr::pluck($items, 'id');
        $products = Attribute::whereIn('id', $attributeIds)
            ->with('typeFeatures')
            ->with('product')
            ->get();

        $sumQuery = Attribute::whereIn('id', $attributeIds)->get();
        $price = $sumQuery->map(function ($data, $key) use ($items) {
            if ($data->discount_status == 'active') {
                return [
                    'id' => $items[$key]['id'],
                    'count' => $items[$key]['count'],
                    'sum_price' => $data->price * $items[$key]['count'],
                    'sum_final_price' => $data->discount * $items[$key]['count'],
                ];
            } else {
                return [
                    'id' => $items[$key]['id'],
                    'count' => $items[$key]['count'],
                    'sum_price' => $data->price * $items[$key]['count'],
                    'sum_final_price' => $data->price * $items[$key]['count'],
                ];
            }

        });

        $products = $products->map(function ($item, $key) use ($items) {
            return collect($item)->prepend($items[$key]['count'], 'product number');
        });

        $sumFinalPrice = $price->sum('sum_final_price');
        $sumPrice = $price->sum('sum_price');

        $taxPrice = $this->taxCalculation($sumFinalPrice);
        $result = [
            'sum_price' => (int)$sumPrice,
            'sum_final_price' => (int)$sumFinalPrice,
            'transport_price' => $sumPrice,
            'tax_price' => $this->taxCalculation($sumFinalPrice),
            'coupon_price' => 0,
            'total_price' => $sumFinalPrice + $taxPrice
        ];
        return success([
            'products' => $products,
            'result' => $result
        ]);
    }

    function addToCart(CreateOrderRequest $request)
    {
        $count = $request->input('count', 1);
        $attributeId = $request->input('attribute_id');
        $remaining = (int)$request->input('remaining', 0);

        if (empty($attributeId)) {
            return $this->message(__('message.cart.checkout.error.attribute_id'))->error();
        }
        $currentCart = [];
        if (session()->has(self::CART_SESSION_ID)) {
            $currentCart = $this->getCart();
        }
        $currentAttributeCount = $this->getCountByAttributeId($attributeId);
        $sumCount = $currentAttributeCount + $count;
        if ($sumCount > $remaining) {
            return $this->message(__('message.cart.checkout.error.remaining'))->error();
        }
        for ($i = 1; $i <= $count; $i++) {
            $currentCart[] = $attributeId;
        }
        session()->put(self::CART_SESSION_ID, $currentCart);
        return success($this->getCart());
    }

    function update(EditOrderRequest $request)
    {
        $count = $request->input('count', 1);
        $attributeId = $request->input('attribute_id');
        $remaining = (int)$request->input('remaining', 0);

        if (empty($attributeId)) {
            return $this->message(__('message.cart.checkout.error.attribute_id'))->error();
        }

        if (!session()->has(self::CART_SESSION_ID))
            return $this->message(__('message.cart.checkout.error.empty'))->error();
        $currentCart = $this->getCart();

        if ($count > $remaining) {
            return $this->message(__('message.cart.checkout.error.remaining'))->error();
        }

        $currentCart = $this->removeByAttributeId($attributeId, $currentCart);
        for ($i = 1; $i <= $count; $i++) {
            $currentCart[] = $attributeId;
        }
        session()->put(self::CART_SESSION_ID, $this->normalArray($currentCart));

        return success($this->getCart());
    }

    function normalArray($currentCart)
    {
        $i = [];
        foreach ($currentCart as $index => $c) {
            $i[$index] = (int)$c;
        }
        return $i;
    }

    function resetCart()
    {
        Session::remove(self::CART_SESSION_ID);
        return success();
    }

    private function getCountByAttributeId($attributeId)
    {
        $cart = $this->getCart();

        if (!empty($cart)) {
            return sizeof(array_filter($cart, function ($item) use ($attributeId) {
                return $item == $attributeId;
            }));
        }
        return null;

    }

    private function getCart()
    {
        return session(self::CART_SESSION_ID);
    }

    private function groupByAttributeIds($attributeIds)
    {
        $ids = [];
        foreach ($attributeIds as $c) {
            $ids[$c][] = $c;
        }
        $result = [];
        $i = 0;
        foreach ($ids as $index => $id) {
            $result[$i]['id'] = $index;
            $result[$i]['count'] = sizeof($id);
            $i++;
        }
        return $result;
    }

    private function removeByAttributeId($attributeId, $currentCart)
    {
        return array_filter($currentCart, function ($item) use ($attributeId) {
            return $item != (int)$attributeId;
        });
    }

    private function taxCalculation($sumPrice)
    {
        $tax = (int)setting('tax');
        return ($sumPrice * ($tax / 100));
    }
}
