<?php

namespace App\Http\Requests\Admin\Role;

use App\Http\Requests\BaseRequest;

class EditRoleRequest extends BaseRequest
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
            "name"=>"required|min:3|unique:permissions,name,".$this->route('roleId'),
            "display_name"=>"required|min:3|unique:permissions,display_name,".$this->route('roleId'),
            "permissions"=> "array",
//            "permissions.*" => "exists:permissions,id",
        ];
    }
}
