<?php

namespace App\Http\Requests\Admin\User;

use App\Rules\iran_mobile;
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
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => ['required','unique:users' , new iran_mobile()],
            'password' => 'required|string|min:4|confirmed',
            'role' => 'required|exists:roles,id',

        ];
    }
}
