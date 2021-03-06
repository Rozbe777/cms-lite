<?php

namespace App\Http\Requests\Admin\Role;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;

class CreateRoleRequest extends FormRequest
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
            "name"=>"required|min:3",
            "display_name"=>"required|min:3",
            "permissions"=> "array",
//            "permissions.*" => "exists:permissions,id",
        ];
    }
}
