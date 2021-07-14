<?php

namespace App\Http\Requests\Front\Order;

use Illuminate\Foundation\Http\FormRequest;

class AttributeIdRequest extends FormRequest
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
            'attributeId' => 'integer',
        ];
    }
}
