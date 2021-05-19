<?php


namespace App\Classes\Validator;


class Validator
{

    function call()
    {
        (new Mobile())->handle();
    }
}
