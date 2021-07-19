<?php


namespace App\Http\Controllers\Front\Order\Traits;


use App\Models\Category;
use App\Models\Coupon;
use App\Models\CouponSetting;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

trait ValidateCoupon
{
    /**
     * @param $attribute
     * @param $number
     * @param $price
     * @param $tax
     * @param $couponCode
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function validateCoupon($attribute, $couponCode)
    {
        $coupon = $this->checkCoupon($couponCode, $attribute);

        if (empty($coupon))
            return __('message.coupon.validation.error.expired');

        if (is_string($coupon))
            return $coupon;

        if ($coupon != true)
            return __('message.coupon.validation.error.none');

        return $coupon;
    }

    /**
     * @param $couponCode
     * @param $attribute
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function checkCoupon($couponCode, $attribute)
    {
        $coupon = Coupon::where('code', $couponCode)->where('status', 'active')->with('coupon_settings')
            ->first();

        if (empty($coupon))
            return __('message.coupon.validation.error.none');

        if (!empty($coupon->coupon_settings->end_date) && $coupon->coupon_settings->end_date < jdate()->getTimestamp())
            return __('message.coupon.validation.error.expired');

        $coupon_functionality = $coupon->coupon_settings->functionality;
        $cart_conditions = $coupon->coupon_settings->cart_conditions;

        /** check coupon functionality on user's cart */
        $coupon_functionality_amount = $coupon->coupon_settings->functionality_amount;

        $productValidation = $this->checkProduct($attribute, $coupon_functionality, $coupon_functionality_amount);
        if (is_string($productValidation))
            return $productValidation;

        /** check coupon access for current user */
        $coupon_user_group = json_decode($coupon->coupon_settings->user_group);
        $user_group = (Auth::user())->group;

        if (($coupon_user_group[0] < -1) && ($coupon_user_group[0] != $user_group))
            return __('message.coupon.validation.error.access');

        if (($coupon_user_group[0] > 0) && !in_array(Auth::id(), json_decode($coupon_user_group)))
            return __('message.coupon.validation.error.access');

        return [
            'coupon_id' => $coupon->id,
            'coupon_code' => $couponCode,
            'coupon_functionality' => [
                'coupon_functionality' => $coupon_functionality,
                'coupon_functionality_amount' => $coupon_functionality_amount,
            ],
            'cart_conditions' => [
                'cart_conditions' => $cart_conditions,
                'cart_conditions_amount' => $coupon->coupon_settings->cart_conditions_amount,
            ],
            'user_group' => [
                'user_status' => $coupon->coupon_settings->user_status,
                'user_group' => $user_group,
            ]
        ];
    }

    /**
     * @param $attribute
     * @param $coupon_functionality
     * @param $coupon_functionality_amount
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function checkProduct($attribute, $coupon_functionality, $coupon_functionality_amount)
    {
        $product_id = collect($attribute)->map(function ($item) {
            return $item['product_id'];
        });

        $categories = collect($attribute)->map(function ($item) {
            $data = Category::whereHas('products', function ($q) use ($item) {
                $q->where('products.id', $item['product_id']);
            })->get();
            return $data;
        });

        foreach ($categories as $category){
           $categories_id[] = ($category->toArray())[0]['id'];
        }

        $i = 0;
        if ($coupon_functionality == "special_products") {
            foreach ($product_id->toArray() as $item) {
                if (!in_array($item, array_map('intval', json_decode($coupon_functionality_amount)))) {
                    $i++;
                }
            }
            if ($i == sizeof($product_id->toArray()))
                return __('message.coupon.validation.error.inclusive');
        }

        $j = 0;
        if ($coupon_functionality == 'special_categories') {
            foreach ($categories_id as $item) {
                if (!in_array($item, array_map('intval', json_decode($coupon_functionality_amount)))) {
                    $j++;
                }
            }
            if ($j == sizeof($product_id->toArray()))
                return __('message.coupon.validation.error.inclusive');
        }
        return true;
    }
}
