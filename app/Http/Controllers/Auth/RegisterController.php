<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use Illuminate\Support\Facades\Auth;


class RegisterController extends Controller
{

    use CreateUserTrait;

    public function register(){
        return view("panel.themes.frest.pages.auth.register");
    }



    public function store(CreateUserRequest $request){

        $user=$this->CreateUser(
            [
                'name'=>$request->name,
                'family'=>$request->family,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'password'=>$request->password,
                'registration_source'=>$request->registration_source,

            ]
        );
        Auth::login($user);
        $user->createToken('authToken')->accessToken;
        dd($user);

        return redirect(config('user.login.redirectUrl'))->with("user", $user);



    }


}
