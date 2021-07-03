<?php


namespace App\Models\Repositories\Front;


use App\Models\Order;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;

class FrontOrderRepository implements RepositoryInterface
{

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
     * @param $id
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
    public function create(array $data)
    {
        return Order::create($data);
    }

    public function multipleDestroy(array $data)
    {
        return Order::whereIn('id', $data['orderIds'])->delete();
    }

    /**
     * @param $id
     * @return void
     */
    public function get($id){}
}
