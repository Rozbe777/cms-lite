<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProductRequest extends FormRequest
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
            "slug" => "required|string",
            "metadata" => "string|nullable",
            "status" => "in:active,deactivate",
            "image" => "image|nullable",
            "attributes.price" => "string",
            "attributes.product_code" => "string|unique:attributes,product_code",
            "attributes.count" => "numeric",
            "attributes.limit" => "numeric",
            "features.name" => "string",
            "features.title" => "required_with:features.name|string",
            "features.value" => "required_with:features.name|string",
            "tag_list" => "array",
            "categoryIds" => "array",
        ];
    }
}
