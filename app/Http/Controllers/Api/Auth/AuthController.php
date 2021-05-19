<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\Auth\Traits\CreateUserTrait;
use App\Http\Controllers\Api\Auth\Traits\LoginUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Helper\ValidationHelper;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\Role;
use App\Rules\iran_mobile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use LoginUserTrait, CreateUserTrait;


    public function store(Request $request)
    {
        $validate = ValidationHelper::Validate($request,
            [
                'name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => ['required', 'unique:users', new iran_mobile()],
                'password' => 'required|string|min:4|confirmed',
            ]);
        if ($validate)
            return structuredError(400, $validate['message'], $validate['errors']);

        try {


            $user = $this->CreateUser(
                [
                    'name' => $request->post('name'),
                    'last_name' => $request->post('last_name'),
                    'phone' => $request->post('phone'),
                    'email' => $request->post('email'),
                    'password' => $request->post('password'),
                    'registration_source' => $request->post('registration_source'),

                ]
            );
            Auth::login($user);
            $token = $user->createToken('authToken')->accessToken;
            $role = Role::whereName('user')->firstOrFail();
            $user->attachRole($role->id);
            $response = ['auth' => respondWithToken($token),
                'user' => $user];
            return structuredSuccess(200, $response);

        } catch (\Exception $exception) {

            return structuredError(422, $exception->getMessage());
        }


    }



    public function login(Request $request){

        $validate = ValidationHelper::Validate($request,
            [
                'username' => 'required|string|max:255',
                'password' => 'required',
            ]);

        if ($validate)
            return structuredError(400, $validate['message'], $validate['errors']);



        if (!$this->userExistsWithUsername($request->post('username')))
            return structuredError(400, 'نام کاربری اشتباه است');


        if ($this->loginUser($request->username,$request->post('password')))
            $user=Auth::user();
        else
            return structuredError(400, 'نام کاربری یا رمز عبور اشتباه است');


            $token=$user->createToken('authToken')->accessToken;

        $response = ['auth' => respondWithToken($token),
            'user' => $user];
        return structuredSuccess(200, $response);


    }

    public function LoginWithToken(){

            $user=Auth::user();

        $response = [
            'user' => $user];
        return structuredSuccess(200, $response);


    }



}
