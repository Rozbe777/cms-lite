<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;

/**
 * @property string name
 * @property string last_name
 * @property string email
 * @property string password
 * @property string phone
 * @property string status
 * @property string registration_source
 * @property string role
 * @property Carbon|null email_verified_at
 */
class EditUserRequest extends FormRequest
{
    /**
     * @var mixed
     */

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
            'name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255unique:users,email,'.$this->route('userId'),
            'phone' => ['nullable','unique:users,phone,'.$this->route('userId') , 'mobile'],
            'password' => 'nullable|string|min:4|confirmed',
            'status' => 'nullable|in:active,deactivate',
            'role' => 'nullable|exists:roles,id',

        ];
    }
}
