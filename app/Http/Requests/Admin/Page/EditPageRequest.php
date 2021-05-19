<?php

namespace App\Http\Requests\Admin\Page;


use App\Http\Requests\Admin\Content\EditContentRequest;

class EditPageRequest extends EditContentRequest
{
    public function rules()
    {
        return [
            'title' => 'string|max:255',
            'slug' => 'string|max:255|unique:contents,slug,',
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
            'category_list_old'=>'array',
            'category_list_new'=>'array',
        ];
    }
}
