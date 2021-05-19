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
        $sms = VerifyMobile::where('mobile',mobile($mobile))->first();
        if ($sms){
            $sms->token = rand(1000, 9999);
            $sms->save();
        }else{
            $sms = new VerifyMobile();
            $sms->mobile = mobile($mobile);
            $sms->token = rand(1000, 9999);
            $sms->save();
        }

        return $sms;
    }
}
