<?php

namespace App\Http\Controllers\Front\Cart;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    const CART_SESSION_ID = 'cart';

    function orderCreate()
    {

    }


    function destroy($attributeId)
    {
        return success($this->removeByAttributeId($attributeId, $this->getCart()));
    }

    function index()
    {
        $cart = $this->getCart();
        $ids = $this->groupByAttributeIds($cart);

        $attributeIds = Arr::pluck($ids, 'id');
        $products = Attribute::whereIn('id', $attributeIds)
            ->with('typeFeatures')
            ->with('product')
            ->get();

        $sumQuery = Attribute::whereIn('id', $attributeIds)->select(DB::raw("sum(if(discount_status='active',discount,price)) as sum_final_price , sum(price) as sum_price"))->first();
        $sumFinalPrice = 0;
        $sumPrice = 0;
        if (!empty($sumQuery->sum_final_price)) {
            $sumFinalPrice = $sumQuery->sum_final_price;
        }
        if (!empty($sumQuery->sum_price)) {
            $sumPrice = $sumQuery->sum_price;
        }
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

    function addToCart(Request $request)
    {
        $count = $request->input('count', 1);
        $attributeId = $request->input('attribute_id');
        $remaining = (int)$request->input('remaining', 0);

        if (empty($attributeId)) {
            return error('شناسه محصول نامعتبر می باشد.');
        }
        $currentCart = [];
        if (session()->has(self::CART_SESSION_ID)) {
            $currentCart = $this->getCart();
        }
        $currentAttributeCount = $this->getCountByAttributeId($attributeId);
        $sumCount = $currentAttributeCount + $count;
        if ($sumCount > $remaining) {
            return error('موجودی انبار کافی نیست!');
        }
        for ($i = 1; $i <= $count; $i++) {
            $currentCart[] = $attributeId;
        }
        session()->put(self::CART_SESSION_ID, $currentCart);
        return success($this->getCart());
    }

    function update(Request $request)
    {
        $count = $request->input('count', 1);
        $attributeId = $request->input('attribute_id');
        $remaining = (int)$request->input('remaining', 0);

        if (empty($attributeId)) {
            return error('شناسه محصول نامعتبر می باشد.');
        }
        $currentCart = [];
        if (session()->has(self::CART_SESSION_ID)) {
            $currentCart = $this->getCart();
        }

        if ($count > $remaining) {
            return error('موجودی انبار کافی نیست!');
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
        session()->forget(self::CART_SESSION_ID);
        return success();
    }

    private function getCountByAttributeId($attributeId)
    {
        $cart = $this->getCart();

        return sizeof(array_filter($cart, function ($item) use ($attributeId) {
            return $item == $attributeId;
        }));
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
            return $item != $attributeId;
        });

    }

    private function taxCalculation($sumPrice)
    {
        $tax = (int)setting('tax');
        return ($sumPrice * ($tax / 100));
    }
}
