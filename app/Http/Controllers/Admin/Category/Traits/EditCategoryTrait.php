<?php

namespace App\Http\Controllers\Admin\Category\Traits;

use App\Models\User;

trait EditCategoryTrait
{

    function EditCategory($user = [])
    {
        $userModel = User::find($user['user_id']);  //user_id is required


        if (!empty($user['name']))
            $userModel->name = $user['name'];

        if (!empty($user['family']))
            $userModel->family = $user['family'];

        if (!empty($user['phone']))
            $userModel->phone = $user['phone'];

        if (!empty($user['email']))
            $userModel->email = $user['email'];

        if (!empty($user['registration_source']))
            $userModel->registration_source = $user['registration_source'];

        if (!empty($user['password']))
            $userModel->password = bcrypt($user['name']);

        if (!empty($user['status']))
            $userModel->status = $user['status'];

        $userModel->save();

        return $userModel;
    }
}
