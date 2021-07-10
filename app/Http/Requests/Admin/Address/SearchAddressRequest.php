<?php

namespace App\Http\Requests\Admin\Address;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class SearchAddressRequest extends BaseRequest
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
            'users_Id' => 'nullable|integer',
            'search' => "nullable|string"
        ];
    }
}
