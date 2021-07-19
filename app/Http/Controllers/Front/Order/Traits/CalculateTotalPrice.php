<?php


namespace App\Http\Controllers\Front\Order\Traits;


use App\Models\Category;
use Illuminate\Support\Facades\Session;

trait CalculateTotalPrice
{
    public function checkCartPrice(array $data , array $products)
    {
        if ($data['coupon_status']['coupon_functionality']['coupon_functionality'] == "special_categories") {

            $items = json_decode($data['coupon_status']['coupon_functionality']['coupon_functionality_amount']);

            foreach ($products as $product){
                $category_id = Category::whereHas('products' ,function ($q) use ($product){
                    $q->where('products.id',$product['id']);
                })->get();
                dd($category_id);
//                $eligible =
            }

        }elseif ($data['coupon_status']['coupon_functionality']['coupon_functionality'] == "special_products") {

        }elseif ($data['coupon_status']['coupon_functionality']['coupon_functionality'] == "total_cart_price") {

        }elseif ($data['coupon_status']['coupon_functionality']['coupon_functionality'] == "total_items_price")
        Session::get(self::CART_SESSION_ID);
    }
}
