<?php

namespace App\Http\Requests\Front\fastAuth;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'mobile' => 'required|nullable|string|min:10|max:11',
            'phone' => 'required|string|min:4|max:15',
            'postal_code' => 'nullable|integer',
            'state' => 'required',
            'city' => 'required',
            'address' => 'required|string',
            'description' => 'string|max:255'
        ];
    }
}
