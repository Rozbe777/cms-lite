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
        $sms = VerifyMobile::where('mobile',$mobile)->first();
        if ($sms){
            $sms->token = rand(1000, 9999);
            $sms->save();
        }else{
            $sms = new VerifyMobile();
            $sms->mobile = $mobile;
            $sms->token = rand(1000, 9999);
            $sms->save();
        }

        return $sms;
    }

    /**
     * recreate and resent token
     */
    public function resendToken($userId)
    {
        $verifyMobileRow = VerifyMobile::where('user_id',$userId)->first();
        $verifyMobileRow->token = rand(100000, 999999);
        $verifyMobileRow->save();
        return $verifyMobileRow->token;
    }

    public function deleteToken($userId)
    {
        return VerifyMobile::where('user_id',$userId)->delete();
    }
}
