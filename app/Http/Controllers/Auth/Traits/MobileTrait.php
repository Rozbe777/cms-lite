<?php


namespace App\Http\Controllers\Auth\Traits;


use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;

trait MobileTrait
{
    public function checkMobileTrait($client, $reqToken)
    {
        $token = (new MobileRepository())->find($client->id);

        if ($reqToken == ($token->token)) {
            $client->status = "active";
            $client->save();
            return true;
        } else {
            return false;
        }
    }

}
