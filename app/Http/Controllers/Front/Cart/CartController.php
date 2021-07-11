<?php

namespace App\Http\Controllers\Front\Cart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

const CART_SESSION_ID = 'cart';
class CartController extends Controller
{
    function orderCreate()
    {

    }

    function addToCart(Request $request)
    {
        $count = $request->input('count', 1);
        $attributeId = $request->input('attribute_id');
        if (empty($attributeId)) {
            return error('شناسه محصول نامعتبر می باشد.');
        }

        $currentCart = [];

        if (session()->has(CART_SESSION_ID)) {
            $currentCart = $this->getCart();
        }
        for ($i = 1; $i <= $count; $i++) {
            $currentCart[] = $attributeId;
        }
        session()->put(CART_SESSION_ID, $currentCart);
        info($this->getCart());
        return success($this->getCart());
    }

    function resetCart()
    {
        session()->forget(CART_SESSION_ID);
        return success();
    }

    private function getCart()
    {
        return session(CART_SESSION_ID);
    }

}
