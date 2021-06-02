<?php


namespace App\Classes\Notifier\Provider\Sms\Gateway;


class Kavenegar extends Gateway
{

    function handle()
    {
        (new Kavenegar\KavenegarApi($this->getUsername()))->VerifyLookup($this->getTo(), $token, '', '', $this->getBody());
    }
}
