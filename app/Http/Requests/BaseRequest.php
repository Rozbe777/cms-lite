<?php
/**
 * Created by PhpStorm.
 * User: mohsen1
 * Date: 10/13/18
 * Time: 4:25 PM
 */

namespace App\Http\Requests;


use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseRequest extends FormRequest
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


    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->messages();

        $message = null;
        foreach ($errors as $item) {
            $message = $item[0];
        }
        throw new HttpResponseException(response(json_encode(error($message, $errors)),422));
    }

}
