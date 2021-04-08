<?php

namespace App\Http\Requests\Admin\Page;


use App\Http\Requests\Admin\Content\EditContentRequest;

class EditPageRequest extends EditContentRequest
{
    public function rules()
    {
        return [
            'title' => 'string|max:255|unique:contents,title,'.$this->route('pageId'),
            'slug' => 'string|max:255|unique:contents,slug,'.$this->route('pageId'),
            'content' => 'text',
            'fields' => 'text',
            'status' => 'in:active,pending,deactivate',
            'user_id' => 'integer|exists:users,id',
            'layout_id' => 'integer|exists:layouts,id',
            'image' => 'image',
            'comment_status' => 'in:active,deactivate',
            'weight' => 'integer',
            'is_index'=>'boolean',
            'is_menu'=>'is_menu',
            'tag_list'=>'array',
            'tag_list.*'=>'string',
        ];
    }
}
