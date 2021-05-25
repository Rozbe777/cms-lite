<?php

namespace App\Http\Requests\Admin\User;

use App\Http\Requests\BaseRequest;

class SearchUserRequest extends BaseRequest
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
            "role_id" => "nullable|integer|exists:roles,id",
            "status" => "nullable|string|in:active,deactivate",
            "search" => "nullable|string",
            "pageSize" => "nullable|integer"
        ];
    }
}
