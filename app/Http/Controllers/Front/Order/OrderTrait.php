<?php


namespace App\Http\Controllers\Front\Order;


use App\Models\Coupon;
use App\Models\CouponSetting;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

trait OrderTrait
{
    /**
     * @param $attribute
     * @param $number
     * @param $price
     * @param $tax
     * @param $couponCode
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function totalPrice($attribute, $number, $price, $tax, $couponCode)
    {
        $coupon = $this->checkCoupon($couponCode, $attribute);

        if (empty($coupon))
            return __('message.coupon.validation.error.expired');

        if (is_string($coupon))
            return $coupon;

        if ($coupon != true)
            return __('message.coupon.validation.error.none');


    }


    /**
     * @param $couponCode
     * @param $attribute
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function checkCoupon($couponCode, $attribute)
    {
        $coupon = Coupon::whereCode($couponCode)->where('status', 'active')
            ->whereHas('coupon_settings', function ($q) {
                $q->where('end_date', '>', jdate()->getTimestamp());
            })
            ->first();
        if (empty($coupon))
            return __('message.coupon.validation.error.expired');

        $coupon_functionality = $coupon->coupon_settings->functionality;
        $cart_conditions = $coupon->coupon_settings->cart_conditions;

        /** check coupon functionality on user's cart */
        $coupon_functionality_amount = $coupon->coupon_settings->functionality_amount;

        $productvalidation = $this->checkProduct($attribute, $coupon_functionality, $coupon_functionality_amount);
        if (is_string($productvalidation))
            return $productvalidation;

        /** check coupon access for current user */
        $coupon_user_group = $coupon->coupon_settings->user_group;
        $user_group = (Auth::user())->group;
        if ($coupon_user_group[0] < -1)
            if ($coupon_user_group[0] != $user_group)
                return __('message.coupon.validation.error.access');

        if ($coupon_user_group[0] > 0)
            if (!in_array($user_group, json_decode($coupon_user_group)))
                return __('message.coupon.validation.error.access');

//            if ($cart_conditions == 'unlimited')
        return true;
    }

    /**
     * @param $attribute
     * @param $coupon_functionality
     * @param $coupon_functionality_amount
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function checkProduct($attribute, $coupon_functionality, $coupon_functionality_amount)
    {
        if ($coupon_functionality == "special_products")
            if (!in_array($attribute->product_id, json_decode($coupon_functionality_amount)))
                return __('message.coupon.validation.error.inclusive');

        $category = (Product::whereId($attribute->product_id)->first())->categories;
        if (count($category) > 0)
            if ($coupon_functionality == 'special_categories')
                if (!in_array($category, json_decode($coupon_functionality_amount)))
                    return __('message.coupon.validation.error.inclusive');

        if (count($category) == 0)
            return __('message.coupon.validation.error.inclusive');

        return true;
    }
}
