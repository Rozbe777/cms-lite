<?php

namespace App\Http\Requests\Admin\User;


use App\Rules\EmailCheck;
use App\Rules\ImageRule;
use App\Rules\MobileCheck;
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
            'mobile' =>  'required|mobile|unique:users',
            'password' => 'required|string|min:4',
            'role_id' => 'required|exists:roles,id',
            'status' => 'nullable|in:active,deactivate',
            'image' => new ImageRule(),
        ];
    }
}
