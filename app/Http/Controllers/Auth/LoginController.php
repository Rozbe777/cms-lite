<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Traits\LoginUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use LoginUserTrait;
        public function show(){
            return view("panel.themes.frest.pages.auth.login");
        }

        public function login(LoginRequest $request){

            if (!$this->userExistsWithUsername($request->username))
                return redirect()->back()->with('msg','نام کاربری اشتباه است');

            if ($this->loginUser($request->username,$request->password))
                $user=Auth::user();
            else
                return redirect()->back()->with('msg','نام کاربری یا رمز عبور اشتباه است');

            return redirect(config('user.login.redirectUrl'))->with('user',$user);

        }

}
