<?php


namespace App\Http\Controllers\Auth\Traits;


use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;

trait MobileTrait
{
    public function checkMobileTrait($user, $reqToken)
    {
        $token = (new MobileRepository())->find($user->id);

        if ($reqToken == ($token->token)) {
            $user->status = "active";
            $user->mobile_verified_at = $token->updated_at;
            $user->save();
            return true;
        } else {
            return false;
        }
    }

}
