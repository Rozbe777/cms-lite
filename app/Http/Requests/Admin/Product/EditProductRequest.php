<?php

namespace App\Http\Requests\Admin\Product;

use App\Http\Requests\BaseRequest;
use App\Rules\AttributeCheck;
use App\Rules\FeaturesCheck;
use App\Rules\FeaturesTitleCheck;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;

class EditProductRequest extends BaseRequest
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
            "content" => "string|nullable",
            "title" => "string|nullable",
            "slug" => "string|nullable",
            "metadata" => "string|nullable",
            "status" => "in:active,deactivate",
            "image" => new ImageRule(),
            //FIXME must check with front dont delete The following rows
//            "attributes" =>new AttributeCheck(),
//            "attributes.*.price" => "integer",
//            "attributes.*.product_code" => "required|string",
//            "attributes.*.count" => "nullable|numeric",
//            "attributes.*.limit" => "nullable|numeric",
//            "features" => new FeaturesTitleCheck(),
//            "features" => new FeaturesCheck(),
//            "features.*.name" => "string",
//            "features.*.color" => "string|required_if:features.*.name,رنگ",
//            "features.*.title" => "required_with:features.name|string",
//            "features.*.value" => "required_with:features.name|string",
            //FIXME must check with front dont delete The top rows
            "tag_list" => "array",
            "category_list" => "array|exists:categories,id",
        ];
    }
}
