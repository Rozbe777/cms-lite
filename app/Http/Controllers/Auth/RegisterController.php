<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;


class RegisterController extends Controller
{

    use CreateUserTrait;

    public function register(){
        return adminView("pages.auth.register");
    }



    public function store(CreateUserRequest $request){
        $user=$this->CreateUser(
            [
                'name'=>$request->name,
                'last_name'=>$request->last_name,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'password'=>$request->password,
                'registration_source'=>$request->registration_source,

            ]
        );
        Auth::login($user);
//        $user->createToken('authToken')->accessToken;
        $role = Role::whereName('user')->firstOrFail();
        $user->attachRole($role->id);
        return redirect(config('user.login.redirectUrl'))->with("user", $user);



    }


}
