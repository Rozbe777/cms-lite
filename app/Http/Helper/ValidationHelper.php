<?php

namespace App\Http\Helper;

use Illuminate\Support\Facades\Validator;

class ValidationHelper
{
    public static function Validate($request, $rolse , $custom_message = [])
    {
        // validation data
        $validator = Validator::make($request->all(), $rolse,$custom_message);

        $errors = $validator->getMessageBag()->toArray();
        if (count($errors) > 0)
            return [
                'message' => "مقادیر وارد شده صحیح نیست !",
                "errors" => $errors
            ];
        return false;
    }

    public static function mobile($mobile, $prefix = null)
    {

        if (substr($mobile, 0, 1) == 0 && $prefix === null)
            return substr($mobile, 1, 9);


        if ($prefix)
            return $prefix . $mobile;

    }
}
