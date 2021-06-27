<?php

namespace App\Http\Requests\Admin\Page;

use Illuminate\Foundation\Http\FormRequest;
use phpDocumentor\Reflection\Types\Nullable;

class CreatePageRequest extends FormRequest
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
//        dd($this->all());
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'content' => 'string|nullable',
            'status' => 'in:active,pending,deactivate|nullable',
            'metadata'=>'string|nullable',
//            'user_id' => 'integer|exists:users,id',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => 'image|nullable',
            'comment_status' => 'in:active,deactivate|nullable',
            'is_index'=>'string|nullable',
            'is_menu'=>'string|nullable',
        ];
    }
}
