<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'image' => 'image|nullable',
            'content' => 'string|nullable',
            'fields' => 'string',
            'parent_id' => "nullable|numeric",
            //'layout_id' => '',//not using now FIXME after insert layout and module
            //'module_id' => '',
            'status' => 'required|string|in:active,deactivate',
            'is_menu' => 'boolean|nullable',
            'is_index' => 'integer|nullable',
            'tag_list' => 'nullable|array',
            'metadata' => 'nullable|string'
        ];
    }
}
