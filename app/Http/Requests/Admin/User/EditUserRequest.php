<?php

namespace App\Http\Requests\Admin\User;

use App\Http\Requests\BaseRequest;
use App\Rules\ImageRule;
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
class EditUserRequest extends BaseRequest
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
            'email' => 'nullable|string|email|unique:users,email,' . ($this['id']),
            'mobile' => 'nullable|unique:users,mobile,' . ($this['id']),
            'password' => 'nullable|string|min:4',
            'status' => 'nullable|in:active,deactivate',
            'role' => 'nullable|exists:roles,id',
            'image' => new ImageRule()
        ];
    }

}
