<?php

namespace App\Http\Requests\Admin\Content;

use App\Http\Requests\BaseRequest;

class EditContentRequest extends BaseRequest
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
            'owner' => 'in:page,content',
            'slug' => 'string|max:255|unique:contents,slug',
            'content' => 'string|nullable',
            'status' => 'in:active,pending,deactivate',
            'user_id' => 'integer|exists:users,id|nullable',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => 'image|nullable',
            'comment_status' => 'in:active,deactivate',
            'is_index'=>'boolean|nullable',
            'is_menu'=>'boolean|nullable',
            'metadata'=>'string|nullable',
            'tag_list_old'=>'array',
            'tag_list_new'=>'array',
        ];
    }
}
