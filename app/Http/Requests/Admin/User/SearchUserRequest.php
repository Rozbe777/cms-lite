<?php

namespace App\Http\Requests\Admin\User;

use Illuminate\Foundation\Http\FormRequest;

class SearchUserRequest extends FormRequest
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
            "confirmed" => "nullable|boolean",
            "role" => "nullable|string|exists:roles,name",
            "status" => "nullable|string|in:active,deactivate",
            "search" => "nullable|string",

        ];
    }
}