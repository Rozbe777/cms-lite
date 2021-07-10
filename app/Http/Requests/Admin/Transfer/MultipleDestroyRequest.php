<?php

namespace App\Http\Requests\Admin\Transfer;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class MultipleDestroyRequest extends BaseRequest
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
            'transfersId' => 'required|array',
        ];
    }
}
