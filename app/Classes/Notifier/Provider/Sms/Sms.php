<?php


namespace App\Classes\Notifier\Provider\Sms;


use App\Classes\Notifier\iNotifier;
use App\Models\User;

class Sms implements iNotifier
{

    function to(User $user)
    {

        return $this;
    }

    function body($body)
    {
        return $this;
    }

    function from($from = null)
    {
        return $this;
    }

    function send()
    {

    }
}
