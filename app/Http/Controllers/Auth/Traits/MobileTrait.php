<?php


namespace App\Http\Controllers\Auth\Traits;


use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\VerifyMobile;
use Illuminate\Support\Facades\Auth;
use Matrix\Exception;

trait MobileTrait
{
    public function checkMobileTrait($client, $reqToken, $status = [])
    {
        if ($reqToken == $client->token) {

            $user = (new UserModelRepository())->create($client);
            /** if verified create a new user */
            if ($status != 'front')
                Auth::login($user);

            VerifyMobile::destroy($client->id);
            return $user;
        } else {
            return false;
        }
    }

}
