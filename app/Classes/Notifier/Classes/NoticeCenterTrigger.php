<?php


namespace App\Classes\Notifier\Classes;


use App\Classes\Notifier\UserOtp;
use App\Models\Repositories\Auth\SmsRepository;

class NoticeCenterTrigger
{
    static public function handle($mobile)
    {
        $token = (new SmsRepository())->createToken($mobile)->token;
        $notifire = \App\Classes\Notifier\Notifier::getInstance(\App\Classes\Notifier\Notifier::SMS_TYPE);

        $notifire->to((new UserOtp())->setMobile($mobile));
        $notifire->body($token);
        $notifire->from('');
        $notifire->send();
    }
}
