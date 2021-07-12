<?php


namespace App\Http\Controllers\Front\Order\Traits;


use Illuminate\Support\Facades\Session;

trait CalculateTotalPrice
{
    public function checkCartPrice(array $data)
    {
        Session::get(self::CART_SESSION_ID);
    }
}
