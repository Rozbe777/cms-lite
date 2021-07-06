<?php

namespace App\Http\Requests\Admin\Profile;


use App\Http\Requests\BaseRequest;
use Illuminate\Support\Facades\Auth;

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
            'id'           => 'integer',
            'name'         => 'string|nullable',
            'last_name'    => 'string|nullable',
            'email'        => 'email|unique:users,email,'.Auth::id(),
            'mobile'       => 'mobile|unique:users,mobile,'.Auth::id(),
            'password'     => 'nullable|min:3|max:24|confirmed'
        ];
    }
}
