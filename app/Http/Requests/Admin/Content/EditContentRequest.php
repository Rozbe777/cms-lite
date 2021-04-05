<?php

namespace App\Http\Requests\Admin\Content;

use Illuminate\Foundation\Http\FormRequest;

class EditContentRequest extends FormRequest
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
            'title' => 'string|max:255',
            'slug' => 'string|max:255|unique:contents,slug,'.$this->route('contentId'),
            'content' => '',
            'fields' => '',
            'status' => 'in:active,pending,deactivate',
            'user_id' => 'integer|exists:users,id',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => 'image',
            'comment_status' => 'in:active,deactivate',
            'weight' => 'integer',
            'is_index'=>'boolean',
            'is_menu'=>'boolean',
            'tag_list'=>'array',
            'tag_list.*'=>'string',
        ];
    }
}
