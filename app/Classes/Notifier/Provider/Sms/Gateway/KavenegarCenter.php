<?php


namespace App\Classes\Notifier\Provider\Sms\Gateway;

use Kavenegar;

class KavenegarCenter extends Gateway
{

    function handle()
    {
        (new Kavenegar\KavenegarApi($this->getUsername()))->VerifyLookup($this->getTo(), $token, '', '', $this->getBody());
    }
}
