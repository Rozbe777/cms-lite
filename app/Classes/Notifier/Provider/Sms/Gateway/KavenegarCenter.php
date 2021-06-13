<?php


namespace App\Classes\Notifier\Provider\Sms\Gateway;

use Kavenegar;

class KavenegarCenter extends Gateway
{

    function handle()
    {
        $mobile = $this->getTo()->mobile;
        $body = is_array($this->getBody()) ? $this->getBody()[0] : $this->getBody();
        $token1 = empty($this->getBody()[1]) ? '' : $this->getBody()[1];
        $token2 = empty($this->getBody()[2]) ? '' : $this->getBody()[1];
        $token3 = empty($this->getBody()[3]) ? '' : $this->getBody()[1];

        (new Kavenegar\KavenegarApi($this->getUsername()))->VerifyLookup($mobile, $token1, $token2, $token3, $body);
    }
}
