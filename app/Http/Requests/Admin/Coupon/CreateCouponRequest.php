<?php

namespace App\Http\Requests\Admin\Coupon;

use App\Http\Requests\BaseRequest;
use App\Rules\CouponCodeCheck;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateCouponRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "code" => new CouponCodeCheck(),
//            "code" => "required|unique:coupons,user_id,".Auth::id(),
            "status" => 'nullable|in:active,deactivate',
            "type" => "nullable|in:fixed_price,percentage,free_delivery",
            'value' => "nullable|string",
            'max_limit' => 'nullable|integer',
            'use_number' => 'nullable|integer',
            'functionality' => 'nullable|in:total_items_price,total_cart_price,special_products,special_categories',
            'functionality_amount' => 'nullable|array|required_if:functionality,special_products,special_categories',
            'cart_conditions' => 'nullable|in:unlimited,min_price,min_purchase_number,max_cart_price,max_purchase_number',
            'cart_conditions_amount' => 'nullable|integer|required_if:cart_conditions,min_price,min_purchase_number,max_cart_price,max_purchase_number',
            'user_status' => 'in:all,special_users,group_of_users',
            'user_group' => 'array|required_if:user_status,special_users,group_of_users',
            'number_of_times_allowed_to_use' => 'nullable|integer',
            'number_of_use_allowed_per_user' => 'nullable|integer',
            'start_date' => 'nullable',
            'end_date' => 'nullable',
        ];
    }
}
