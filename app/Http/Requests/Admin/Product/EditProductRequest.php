<?php

namespace App\Http\Requests\Admin\Product;

use Illuminate\Foundation\Http\FormRequest;

class EditProductRequest extends FormRequest
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
            "content" => "string|nullable",
            "title" => "string|nullable",
            "slug" => "string|nullable",
            "metadata" => "string|nullable",
            "status" => "in:active,deactivate",
            "image" => "image|nullable",
            "attributes.*.price" => "integer",
            "attributes.*.product_code" => "required|string",
            "attributes.*.count" => "nullable|numeric",
            "attributes.*.limit" => "nullable|numeric",
            "features.*.name" => "string",
            "features.*.color" => "string|required_if:features.*.name,رنگ",
            "features.*.title" => "required_with:features.name|string",
            "features.*.value" => "required_with:features.name|string",
            "tag_list" => "array",
            "categoryIds" => "array|exists:categories,id",
        ];
    }
}
