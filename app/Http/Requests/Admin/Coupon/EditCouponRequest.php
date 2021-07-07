<?php

namespace App\Http\Requests\Admin\Coupon;

use App\Http\Requests\BaseRequest;

class EditCouponRequest extends BaseRequest
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
            "code" => 'required',
            "status" => "nullable|in:active,deactivate",
            "type" => "nullable|in:fixed_price,percentage,free_delivery",
            'value' => "nullable|string",
            'max_limit' => 'nullable|integer',
            'use_number' => 'nullable|integer',
            'functionality' => 'nullable|string',
            'functionality_amount' => 'nullable|array',
            'cart_conditions' => 'nullable|in:unlimited,min_price,min_purchase_number,max_cart_price,max_purchase_number',
            'cart_conditions_amount' => 'nullable|integer',
            'user_status' => 'nullable|in:all,special_users,group_of_users',
            'user_group' => 'nullable|array',
            'number_of_times_allowed_to_use' => 'nullable|integer',
            'number_of_use_allowed_per_user' => 'nullable|integer',
            'start_date' => 'nullable',
            'end_date' => 'nullable',
        ];
    }
}
