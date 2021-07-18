<?php

namespace App\Http\Requests\Admin\Profile;


use App\Http\Requests\BaseRequest;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string|nullable',
            'last_name' => 'string|nullable',
            'email' => 'nullable|email|unique:users,email,' . Auth::id(),
            'mobile' => 'nullable|mobile|unique:users,mobile,' . Auth::id(),
            'description' => 'nullable|string',
            'password' => 'nullable|min:3|max:24|confirmed',
            'image' => new ImageRule(),
        ];
    }
}
