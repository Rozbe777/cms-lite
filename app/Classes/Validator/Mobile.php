<?php

namespace App\Classes\Validator;

use Illuminate\Support\Facades\Validator;

class Mobile extends BaseValidator
{


    function handle()
    {
        Validator::extend('mobile', function ($attribute, $value, $parameters, $validator) {
            return !empty(mobile($value));
        });
    }
}
