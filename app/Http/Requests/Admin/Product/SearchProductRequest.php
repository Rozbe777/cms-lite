<?php

namespace App\Http\Requests\Admin\Product;;

use Illuminate\Foundation\Http\FormRequest;

class SearchProductRequest extends FormRequest
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
            "status" => "in:true,false|nullable",
            "entity" => "in:true,false|nullable",
            "categories" => "nullable|array",
            "sort" => "nullable|string",
            "search" => "nullable|string",
            "discount" => "in:true,false|nullable",
        ];
    }
}
