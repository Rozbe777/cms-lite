<?php


namespace App\Http\Controllers\Admin\User\Traits;


trait UserTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('images', $imageName);
    }

//    /**
//     * @param $user array
//     * @return User
//     */
//    function createUser($user)
//    {
//        $userModel = new User();
//        if (!empty($user['name']))
//            $userModel->name = $user['name'];
//        if (!empty($user['last_name']))
//            $userModel->last_name = $user['last_name'];
//        if (!empty($user['phone']))
//            $userModel->phone = $user['phone'];
//        if (!empty($user['email']))
//            $userModel->email = $user['email'];
//        $userModel->email_verified_at = now();
//        $userModel->status = config('user.register.default_status');
//        if (!empty($user['registration_source']))
//            $userModel->registration_source = $user['registration_source'];
//        if (!empty($user['password']))
//            $userModel->password = bcrypt($user['password']);
//        $userModel->save();
//        return $userModel;
//    }
}