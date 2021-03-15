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
            'owner' => 'in:page,content',
            'title' => 'string|max:255|unique:contents,title',
            'slug' => 'string|max:255|unique:contents,slug',
            'content' => 'text',
            'fields' => 'text',
            'status' => 'in:active,pending,deactivate',
            'user_id' => 'integer|exists:users,id',
            'layout_id' => 'integer|exists:layouts,id',
            'image' => 'image',
            'comment_status' => 'in:active,deactivate',
            'weight' => 'integer',
        ];
    }
}
