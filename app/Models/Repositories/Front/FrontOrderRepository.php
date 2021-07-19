<?php


namespace App\Models\Repositories\Front;


use App\Http\Controllers\Front\Order\Traits\CalculateTotalPrice;
use App\Http\Controllers\Front\Order\Traits\ValidateCoupon;
use App\Models\Address;
use App\Models\Attribute;
use App\Models\Coupon;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Transfer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class FrontOrderRepository implements RepositoryInterface
{

    use CalculateTotalPrice;
    use ValidateCoupon;
    const CART_SESSION_ID = 'cart';
    const ORDER_SESSION_ID = 'order';

    /**
     * @return mixed
     */
    public function all($status = null, $userId = null, $minPrice = null, $maxPrice = null, $minDate = null, $maxDate = null)
    {
        return Order::when(!empty($status), function ($query) use ($status) {
            $query->where('status', $status);
        })->when(!empty($user_id), function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->when(!empty($minPrice), function ($query) use ($minPrice) {
            $query->where('price', '>=', $minPrice);
        })->when(!empty($maxPrice), function ($query) use ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        })->when(!empty($minDate), function ($query) use ($minDate) {
            $query->where('created_at', '>=', $minDate);
        })->when(!empty($maxDate), function ($query) use ($maxDate) {
            $query->where('created_at', '<=', $maxDate);
        })->orderByDesc('id')->get();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($order)
    {
        return $order->delete();
    }

    /**
     * @param array $data
     * @param $order
     * @return mixed
     */
    public function update(array $data, $order)
    {
        return $order->update($data);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data = null)
    {
        $address = Address::where('user_id',Auth::id())->whereStatus('active')->first();
        $order = Order::where('user_id', Auth::id())->where('status', 'pending_pay')->first();
        if (empty($order) && Session::has(self::ORDER_SESSION_ID)) {

            $order = Session::get(self::ORDER_SESSION_ID);

            $facture = [
                'user_id' => Auth::id(),
                'status' => 'process',
                'sum_price' => $order['result']['sum_price'],
                'sum_final_price' => $order['result']['sum_final_price'],
                'total_price' => $order['result']['total_price'],
                'coupon_code' => $data['coupon_code'],
                'tax' => $order['result']['tax_price'],
                'description' => $data['description'],
                'transport_id' => $data['transport_id'],
                'address_id' => $address,
            ];

            $products = ($order['products'])->toArray();

            $facture['coupon_status'] = $this->validateCoupon($products, (int)$facture['coupon_code']);
            if (is_string($facture['coupon_status']))
                return $facture['coupon_status'];

            $this->checkCartPrice($facture,$products);

            $order = Order::create($data);
            $order->attributes()->attach($products, ['number_of_product' => $number]);
        } else {
            $order->total_price += $data['price'];
        }


        Session::put('order', $order);
        return $order;
    }

    public function multipleDestroy(array $data)
    {
        return Order::whereIn('id', $data['orderIds'])->delete();
    }

    /**
     * @param $order
     */
    public function checkout($order)
    {
        $products = $order->attributes;
    }

    /**
     * @param $id
     * @return void
     */
    public function get($id)
    {
    }
}
