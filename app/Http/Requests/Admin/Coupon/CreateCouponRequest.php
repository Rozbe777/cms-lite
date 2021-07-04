<?php

namespace App\Http\Requests\Admin\Coupon;

use App\Rules\CouponCodeCheck;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateCouponRequest extends FormRequest
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
//            "start"
//            "pageSize" => "nullable|integer"
        ];
    }
}
