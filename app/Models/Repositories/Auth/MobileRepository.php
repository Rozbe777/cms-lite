<?php


namespace App\Models\Repositories\Auth;


use App\Models\VerifyMobile;

class MobileRepository
{
    static public function find($mobile)
    {
        return VerifyMobile::orderBy('id','desc')->firstWhere('mobile', $mobile);
    }

    public function creatClient($mobile)
    {
        return VerifyMobile::create([
           'mobile'=>$mobile,
        ]);
    }
}
