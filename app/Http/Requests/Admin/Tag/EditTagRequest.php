<?php

namespace App\Http\Requests\Admin\Tag;

use App\Http\Requests\BaseRequest;

class EditTagRequest extends BaseRequest
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
            'name' => 'string|max:255|unique:tags,name,',
            'category_list_old' => 'array|nullable',
            'category_list_new' => 'array|nullable'
        ];
    }
}
