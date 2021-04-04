<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class EditCategoryRequest extends FormRequest
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
            'name' => 'string|max:255|unique:categories,name,'.$this->route('categoryId'),
            'slug' => 'string|max:255|unique:categories,slug,'.$this->route('categoryId'),
            'image' => 'string|image',
            'description' => '',
            'fields' => '',
            'parent_id' => 'exists:categories,id',
//            'layout_id' => '',//not using now FIXME after insert layout and module
//            'module_id' => '',
            'status' => 'string|in:active,deactivate' ,
        ];
    }
}
