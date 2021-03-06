<?php

namespace App\Http\Requests\Admin\Page;


use App\Http\Requests\Admin\Content\EditContentRequest;
use App\Http\Requests\BaseRequest;
use App\Rules\ImageRule;

class EditPageRequest extends BaseRequest
{
    /**
    }
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
//            'title' => "string|max:255|unique:contents,name,{$this->page->id}",
            'title' => "string|max:255",
            'slug' => 'string|max:255',
            'content' => 'string|nullable',
            'status' => 'in:active,pending,deactivate',
            'user_id' => 'integer|exists:users,id|nullable',
//            'layout_id' => 'integer|exists:layouts,id',//FIXME after insert layouts table
            'image' => new ImageRule(),
            'is_index'=>'boolean|nullable',
            'is_menu'=>'boolean|nullable',
            'metadata'=>'string|nullable',
        ];
    }
}
