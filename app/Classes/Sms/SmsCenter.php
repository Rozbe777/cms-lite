<?php


namespace App\Classes\Sms;

use Kavenegar;

class SmsCenter
{
    public function sendToken($mobile = [], $token)
    {
        $receptor = $mobile;            //Receptors numbers
        $template = config('kavenegar.template');

        (new Kavenegar\KavenegarApi(config('kavenegar.apikey')))->VerifyLookup($receptor, $token, '', '', $template);
    }
}
