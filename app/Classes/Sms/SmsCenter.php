<?php


namespace App\Classes\Sms;

use Kavenegar;

class SmsCenter
{
    public function sendToken($mobile = [], $token)
    {
        $receptor = $mobile;            //Receptors numbers
        $template = "verify";

        (new Kavenegar\KavenegarApi(config('kavenegar.apikey')))->VerifyLookup($receptor, $token, '', '', $template);
    }
}
