<?php

namespace App\Http\Requests\Admin\Content;

use App\Http\Requests\BaseRequest;

class SearchContentRequest extends BaseRequest
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
            "search" => "nullable|string",
            "owner" => "nullable|in:page,content",
            "status" => "nullable|in:active,pending,deactivate",
        ];
    }
}
