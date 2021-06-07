<?php


namespace App\Classes\Notifier;


use App\Models\User;

class Notifier
{


    function sms()
    {
        return (new Provider\Sms\Sms());
    }

}
