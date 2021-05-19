<?php

namespace App\Http\Requests\Admin\Profile;


use App\Http\Requests\BaseRequest;

class PasswordRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'current_password' => 'required',
            'password' => 'required|min:4|confirmed',
            'password_confirmation' => 'required',
        ];
    }
}
