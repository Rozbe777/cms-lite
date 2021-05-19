<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Http\Controllers\Auth\Traits\LoginUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    protected $response;
    protected $userRepository;

    public function __construct(Responses $response, UserModelRepository $userRepository)
    {
        $this->response = $response;
        $this->userRepository = $userRepository;
    }

    public function show()
    {
        return adminView("pages.auth.login");
    }

    public function login(LoginRequest $request)
    {
        $remember_me = (!empty($request->remember_me)) ? true : false;

        /** $credentials if user email exists */
        $credentials = ['mobile'=>mobile($request->mobile), 'password'=>$request->password];

        if (Auth::attempt($credentials,$remember_me)) {
            $user = $this->userRepository->findByMobile($credentials['mobile']);

            Auth::login($user);

            return str_contains(\Route::current()->uri, 'api') ?
                $this->response->success("login successfully"):
                redirect()->route('admin.dashboard.index');
        } else {
            return str_contains(\Route::current()->uri, 'api') ?
                $this->response->notSuccess('login failed',404):
                redirect()->route('login');

        }
    }

    public function logout()
    {
        Auth::logout();

        return str_contains(\Route::current()->uri, 'api') ?
             $this->response->success("logOut successfully"):
             adminView("pages.auth.login");
    }
}
