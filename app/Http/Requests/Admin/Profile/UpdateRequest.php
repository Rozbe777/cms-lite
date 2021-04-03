<?php

namespace App\Http\Requests\Admin\Profile;


use App\Http\Requests\BaseRequest;

class UpdateRequest extends BaseRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email,' . auth()->id(),
            'phone' => 'required|mobile|unique:users,phone,' . auth()->id(),
        ];
    }
}
