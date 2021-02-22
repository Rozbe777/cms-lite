<?php

namespace App\Http\Requests\User;

use App\Rules\iran_mobile;
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
class EditUserRequest extends FormRequest
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
            'name' => 'nullable|string|max:255',
            'family' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',//FIXME unique:users,email,'.$this->request->get("id") not works
            'phone' => new iran_mobile(),
            'password' => 'nullable|string|min:4|confirmed',
            'status' => 'nullable|in:active,deactivate',

        ];
    }
}
