<?php


namespace App\Classes\Notifier\AbstractFactory;

use Kavenegar;

class SmsWriter implements ISmsWriter
{
    /**
     * @param $mobile
     * @return mixed
     */
    public function to($mobile)
    {
        if (strlen($mobile) == 10 && substr($mobile,0,1) != 0)
            $mobile = '0'.$mobile;

        return $mobile;
    }

    /**
     * @param $body
     * @return mixed
     */
    public function body($body)
    {
        return $body;
    }

    /**
     * @param $from
     * @return mixed
     */
    public function from($from)
    {
        return $from;
    }

    /**
     * @return mixed
     */
    public function send($to,$body,$from)
    {
        (new Kavenegar\KavenegarApi(config('kavenegar.apikey')))->VerifyLookup($receptor, $token, '', '', config('kavenegar.template'));
    }
}
