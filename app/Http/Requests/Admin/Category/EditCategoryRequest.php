<?php

namespace App\Http\Requests\Admin\Category;

use App\Http\Requests\BaseRequest;
use App\Rules\FormDataRule;
use App\Rules\ImageRule;
use Illuminate\Foundation\Http\FormRequest;

class EditCategoryRequest extends BaseRequest
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
            'title' => "nullable|string|max:255",
            'slug' => "nullable|string|max:255",
            'image' => new ImageRule(),
            'content' => 'nullable|string',
            'fields' => 'nullable|string',
            'parent_id' => 'nullable|different:id',
            'is_menu' => 'nullable|boolean',
//            'layout_id' => '',//not using now FIXME after insert layout and module
//            'module_id' => '',
            'status' => 'nullable|string|in:active,deactivate',
            'tag_list'=>new FormDataRule(),
            'category_list' => new FormDataRule(),
            'metadata' => 'nullable|string'
        ];
    }
}
