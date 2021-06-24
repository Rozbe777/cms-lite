<?php

namespace App\Http\Requests\Admin\Content;

use App\Http\Controllers\FileManager\ImageController;
use App\Rules\FormDataRule;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateContentRequest extends FormRequest
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
            'slug' => 'required|string|max:255',
            'content' => 'string|nullable',
            'status' => 'in:active,pending,deactivate',
            'metadata' => 'json|nullable',
            'user_id' => 'integer|exists:users,id',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => new ImageRule(),
            'comment_status' => 'in:active,deactivate',
            'is_menu'=>'boolean|nullable',
            'tag_list'=>new FormDataRule(),
            'category_list' => new FormDataRule()
        ];
    }

}
