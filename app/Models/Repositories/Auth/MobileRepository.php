<?php


namespace App\Models\Repositories\Auth;


use App\Models\VerifyMobile;

class MobileRepository
{
    public function find($mobile)
    {
        return VerifyMobile::firstWhere('mobile', $mobile);
    }

    public function creatClient($mobile)
    {
        return VerifyMobile::create([
           'mobile'=>$mobile,
        ]);
    }
}
