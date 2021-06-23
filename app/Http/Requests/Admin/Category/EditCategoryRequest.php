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
            'name' => "nullable|string|max:255",
            'slug' => "nullable|string|max:255",
//            'image' => "nullable|image",
            'content' => 'nullable|string',
            'fields' => 'nullable|string',
            'parent_id' => 'nullable|different:id',
            'is_menu'=>'nullable|boolean',
//            'layout_id' => '',//not using now FIXME after insert layout and module
//            'module_id' => '',
            'status' => 'nullable|string|in:active,deactivate' ,
            'tag_list'=>'nullable|array',
            'metadata'=>'nullable|string'
        ];
    }
}
