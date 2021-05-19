<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{

    use CreateUserTrait;

    public function show()
    {
        return adminView("pages.auth.register");
    }

    public function store(CreateUserRequest $request)
    {
        /** update User info */
        $user = (new UserModelRepository())->update($request);

        $response = new Responses();

        if (is_array($user)) {
            /** when throw an exception */
            return $response->notSuccess($user['exception_message'], 404);
        }

        Auth::login($user);

        $role = Role::where('name', 'admin')->firstOrFail();
        $user->attachRole($role->id);

        return $response->success('user info is updated');
    }


}
