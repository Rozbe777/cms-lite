<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use ResponseTrait;

    public function login(LoginRequest $request)
    {
        $remember_me = (!empty($request->remember_me)) ? true : false;

        /** $credentials if user email exists */
        $credentials = ['mobile'=>mobile($request->mobile), 'password'=>$request->password];

        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        if (Auth::attempt($credentials,$remember_me)) {
            $user = User::whereMobile($credentials['mobile'])->first();

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            if ($remember_me)
                $token->expires_at = Carbon::now()->addWeeks(1);
            $token->save();

            $data = [
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ];
            return $this->data($data)->message(__("message.auth.login.successful"))->success();
        } else {
            return  $this->message(__("message.auth.login.failed"))->view("pages.auth.login")->error(401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
