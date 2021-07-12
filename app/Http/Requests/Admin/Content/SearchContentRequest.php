<?php

namespace App\Http\Requests\Admin\Content;

use Illuminate\Foundation\Http\FormRequest;

class SearchContentRequest extends FormRequest
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
            "pageSize" => "nullable|integer",
            "tags" => 'array',
            "categories" => 'array',
        ];
    }
}
