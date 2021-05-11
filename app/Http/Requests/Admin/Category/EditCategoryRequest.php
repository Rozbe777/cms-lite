<?php

namespace App\Http\Requests\Admin\Category;

use App\Http\Requests\BaseRequest;

class EditCategoryRequest extends BaseRequest
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
            'name' => 'string|max:255|unique:categories,name,',
            'slug' => 'string|max:255|unique:categories,slug,',
            'image' => 'string|image|nullable',
            'content' => 'string',
            'fields' => 'string',
            //'parent_id' => 'exists:categories,id',
            'is_menu'=>'boolean|nullable',
//            'layout_id' => '',//not using now FIXME after insert layout and module
//            'module_id' => '',
            'status' => 'string|in:active,deactivate' ,
            'tag_list_old'=>'array',
            'tag_list_new'=>'array',
            'metadata'=>'string'

        ];
    }
}
