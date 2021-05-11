<?php

namespace App\Http\Requests\Admin\Content;

use App\Http\Requests\BaseRequest;

class CreateContentRequest extends BaseRequest
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
            'title' => 'required|string|max:255',
            'owner' => 'in:page,content',
            'slug' => 'required|string|max:255|unique:contents,slug',
            'content' => 'string|nullable',
            'status' => 'in:active,pending,deactivate',
            'metadata'=>'string|nullable',
            'user_id' => 'integer|exists:users,id',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => 'image|nullable',
            'comment_status' => 'in:active,deactivate',
            'is_index'=>'boolean|nullable',
            'is_menu'=>'boolean|nullable',
            'tag_list'=>'array'
        ];
    }
}
