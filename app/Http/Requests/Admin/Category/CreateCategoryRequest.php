<?php

namespace App\Http\Requests\Admin\Category;

use App\Http\Requests\BaseRequest;

class CreateCategoryRequest extends BaseRequest
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
            'name' => 'required|string|max:255|unique:categories,name',
            'slug' => 'required|string|max:255|unique:categories,slug',

            'image' => 'required|image',
            'content' => '',
            'fields' => '',
            //'parent_id' => 'exists:categories,id',
//            'layout_id' => '',//not using now FIXME after insert layout and module
//            'module_id' => '',
            'status' => 'required|string|in:active,deactivate',
            'is_menu' => 'boolean',
            'tag_list' => 'array',
            'tag_list.*' => 'string',
            'metadata' => ''
        ];
    }
}
