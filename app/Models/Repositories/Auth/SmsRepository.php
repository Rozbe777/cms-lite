<?php


namespace App\Models\Repositories\Auth;


use App\Models\VerifyMobile;

class SmsRepository
{
    /**
     * create token
     */
    public function createToken($mobile)
    {
        $mobile = mobile($mobile);
        $sms = VerifyMobile::orderBy('id', 'desc')->where('mobile', $mobile)->first();
        //developer mobile numbers
        $developers = config('notifier.developers');
        if ($this->isDeveloper($mobile, $developers)) {
            $code = config('notifier.developer_code');
        } else {
            $code = rand(1000, 9999);
        }
        if ($sms) {
            $sms->token = $code;
            $sms->save();
        } else {
            $sms = new VerifyMobile();
            $sms->mobile = mobile($mobile);
            $sms->token = $code;
            $sms->save();
        }

        return $sms;
    }

    function isDeveloper($currentMobile, $developersMobile)
    {
        if (in_array($currentMobile, $developersMobile)) {
            return true;
        } else {
            return false;
        }
    }
}
