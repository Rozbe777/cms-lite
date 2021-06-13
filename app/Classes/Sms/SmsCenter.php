<?php


namespace App\Classes\Sms;

use Kavenegar;

class SmsCenter
{
    public function sendToken($mobile = [], $token)
    {

        $receptor = $mobile;            //Receptors numbers
        (new Kavenegar\KavenegarApi(config('kavenegar.apikey')))->VerifyLookup($receptor, $token, '', '', config('kavenegar.template'));
    }
}
