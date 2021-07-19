<?php

namespace App\Http\Requests\Admin\Product;

use App\Http\Requests\BaseRequest;
use App\Models\Attribute;
use App\Rules\AttributeCheck;
use App\Rules\FeaturesCheck;
use App\Rules\FormDataRule;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateProductRequest extends BaseRequest
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
            "title" => "nullable|string",  //FIXME front does not pass it
//            "slug" => "required|string", //FIXME front does not pass it
            "metadata" => "nullable|string",
            "status" => "in:active,deactivate",
            "attributes" => new AttributeCheck(),
            "features" => new FeaturesCheck(),

            //FIXME Do Not DELETE These
//            "attributes.*.price" => "required|integer",
//            "attributes.*.product_code" => "required|string|unique:attributes,product_code",
//            "attributes.*.count" => "nullable|integer",
//            "attributes.*.limit" => "nullable|integer|gt:0|lt:attributes.*.count",
//            "features.*.name" => "string",
//            "features.*.color" => "string|required_if:features.*.name,رنگ",
//            "features.*.title" => "required_with:features.*.name|string",
//            "features.*.value" => "required_with:features.*.name|string",
            //FIXME Until here....
            "tag_list" => new FormDataRule(),
//            "category_list" => new FormDataRule(),
        ];
    }
}
