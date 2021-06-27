<?php

namespace App\Http\Requests\Admin\Product;

use App\Rules\FormDataRule;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
        dd($this->all());
        return [
            "content" => "nullable|string",
            "title" => "nullable|string",
            "slug" => "required|string",
            "metadata" => "nullable|string",
            "status" => "in:active,deactivate",
            "image" => new ImageRule(),
            "attributes.*.price" => "required|integer",
//            "attributes.*.product_code" => "required|string|unique:attributes,product_code",
            "attributes.*.product_code" => "required|string",
            "attributes.*.count" => "nullable|integer",
            "attributes.*.limit" => "nullable|integer|gt:0|lt:attributes.*.count",
            "features.*.name" => "string",
            "features.*.color" => "string|required_if:features.*.name,رنگ",
            "features.*.title" => "required_with:features.*.name|string",
            "features.*.value" => "required_with:features.*.name|string",
            "tag_list" => new FormDataRule(),
            "category_list" => new FormDataRule(),
        ];
    }
}
