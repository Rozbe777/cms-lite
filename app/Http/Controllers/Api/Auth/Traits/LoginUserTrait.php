<?php


namespace App\Http\Controllers\Api\Auth\Traits;


use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

trait LoginUserTrait
{



    function loginUser($username, $password)
    {

        if (mobile($username))
            return $this->loginWithMobile($username, $password);
        else
            return $this->loginWithEmail($username, $password);

    }

    function loginWithMobile($username, $password): bool
    {

        if (!(Auth::attempt(['phone' => $username, 'password' => $password])))
            return false;

        return true;



    }

    function loginWithEmail($username, $password): bool
    {
        if (!(Auth::attempt(['email' => $username, 'password' => $password])))
            return false;


        return true;


    }

    function userExistsWithUsername($username): bool
    {
        if (mobile($username)) {
            if (User::where([
                'phone' => $username
            ])->exists())
                return true;

            return false;
        } else {
            if (User::where([
                'email' => $username
            ])->exists())
                return true;

            return false;
        }
    }
}
