<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Traits\LoginUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use LoginUserTrait;


    public function __construct()
    {
        $this->middleware('guest');
    }

    public function show()
    {
        return adminView("pages.auth.login");
    }

    public function login(LoginRequest $request)
    {

        $fetch = request()->input('fetch', false);
        if (!$this->userExistsWithUsername($request->username))
            return $fetch ? response(error('نام کاربری یا رمز عبور اشتباه است'), 404) : redirect()->back()->with('msg', 'نام کاربری اشتباه است');

        if ($this->loginUser($request->username, $request->password)) {
            $user = Auth::user();
        } else {
            return $fetch ? response(error('نام کاربری یا رمز عبور اشتباه است'), 404) : redirect()->back()->with('msg', 'نام کاربری یا رمز عبور اشتباه است');
        }


        if ($user->status == 'active') {
            // $token = $user->createToken('authToken')->accessToken;
            return $fetch ? success([
                'redirect_url' => config('user.login.redirectUrl'),
                'user' => $user,
            ], 'شما با موفقیت وارد شدید') : redirect(config('user.login.redirectUrl'))->with('user', $user);
        } else {
            Auth::logout();
            return $fetch ? response(error('حساب شما غیرفعال شده است!'), 404) : redirect()->back()->with('msg', 'حساب شما غیرفعال شده است!');
        }
    }


}
