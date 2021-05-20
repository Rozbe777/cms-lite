<?php


namespace App\Http\Controllers\Auth\Traits;


use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\VerifyMobile;
use Matrix\Exception;

trait MobileTrait
{
    public function checkMobileTrait($client, $reqToken, $passReset = [])
    {
        $token = (new MobileRepository())->find($client->mobile);

        if ($reqToken == ($token->token)) {
            $client->status = "active";
            $client->save();

            $user = (new UserModelRepository())->create($client);
            VerifyMobile::destroy($client->id);
            return $user;

        } else {
            return false;
        }
    }

}
