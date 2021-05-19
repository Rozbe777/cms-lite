<?php


namespace App\Http\Controllers\Api\Auth\Traits;


use App\Models\User;

trait CreateUserTrait
{
    /**
     * @param array $user
     * @return User
     */
    function CreateUser($user = []): User
    {
        $userModel = new User();
        if (!empty($user['name']))
            $userModel->name = $user['name'];

        if (!empty($user['last_name']))
            $userModel->last_name = $user['last_name'];

        if (!empty($user['phone']))
            $userModel->phone = $user['phone'];

        if (!empty($user['email']))
            $userModel->email = $user['email'];

        if (!empty($user['registration_source']))
            $userModel->registration_source = $user['registration_source'];

        if (!empty($user['password']))
            $userModel->password = bcrypt($user['password']);

        $userModel->email_verified_at = now();
        $userModel->status = config('user.register.default_status');

        $userModel->save();

        return $userModel;
    }

}
