<?php


namespace App\Models\Repositories\Auth;


use App\Models\VerifyMobile;

class MobileRepository
{
    public function find($id)
    {
        return VerifyMobile::where('user_id',$id)->first();
    }
}
