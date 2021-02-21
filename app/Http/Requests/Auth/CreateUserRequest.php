<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

/**
 * @property string name
 * @property string family
 * @property string email
 * @property string password
 * @property string phone
 * @property string status
 * @property string registration_source
 * @property Carbon|null email_verified_at
 */
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
            'family' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|digits_between:11,11|unique:users',
            'password' => 'required|string|min:4|confirmed',
        ];
    }
}
