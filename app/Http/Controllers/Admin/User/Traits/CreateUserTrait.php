<?php


namespace App\Http\Controllers\Admin\User\Traits;


use App\Models\User;


trait CreateUserTrait
{
    /**
     * @param $user array
     * @return User
     */
    function createUser($user)
    {
        $userModel = new User();
        if (!empty($user['name']))
            $userModel->name = $user['name'];
        if (!empty($user['family']))
            $userModel->family = $user['family'];
        if (!empty($user['phone']))
            $userModel->phone = $user['phone'];
        if (!empty($user['email']))
            $userModel->email = $user['email'];
        $userModel->email_verified_at = now();
        $userModel->status = config('user.register.default_status');
        if (!empty($user['registration_source']))
            $userModel->registration_source = $user['registration_source'];
        if (!empty($user['password']))
            $userModel->password = bcrypt($user['password']);
        $userModel->save();
        return $userModel;
    }
}
