<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Classes\Notifier\Classes\NoticeCenterTrigger;
use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\MobileRegisterRequest;
use App\Http\Requests\MobileRequest;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\SmsRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\User;
use App\Models\VerifyMobile;
use Carbon\Carbon;

class MobileRegisterController extends Controller
{
    use MobileTrait, ResponseTrait;

    protected $sms;
    protected $mobileRepository;
    protected $responses;

    public function __construct(Responses $responses, SmsRepository $sms, MobileRepository $mobileRepository)
    {
        $this->sms = $sms;
        $this->mobileRepository = $mobileRepository;
        $this->responses = $responses;
    }

    /** verify user's mobile */
    public function register(MobileRegisterRequest $request)
    {
        $mobile = mobile($request->mobile);

        /** check if mobile was registered */
        $user = User::whereMobile($mobile)->first();
        $client = VerifyMobile::orderBy('id','desc')->firstWhere('mobile', $mobile);

        if ((!$user && !$client) || (!isset($user->password) && !$client)) {
            /** mobile was not registered */
            $client = $this->mobileRepository->creatClient($mobile);

            /** API panel SMS */
            NoticeCenterTrigger::handle($request->mobile);

            return $this->data()->message(__('message.auth.register.resendToken.successful'))->success();

        } elseif ($user && isset($user->password)) {
            /** if user has a password so the mobile number was registered completely
             * {{ Do you Forgot Your Password?? }}
             */

            return $this->message(__("message.auth.register.alreadyRegistered"))->success(201);

        } elseif (($user && !isset($user->password)) || $client) {
            /** check for the last time that we sent a token then resend it after 2 min. */
            $needToPass = config('kavenegar.waitTimer') - (strtotime(Carbon::now()->toDateTimeString()) - strtotime($this->mobileRepository->find($mobile)->updated_at->toDateTimeString()));

            if ($needToPass < 0) {
                /** send the token again */
                NoticeCenterTrigger::handle($request->mobile);

                return $this->message(__('message.auth.register.resendToken.successful'))->success();
            } else {
                return $this->message(__('message.auth.register.resendToken.wait') . $needToPass)->data($needToPass)->error(429);
            }
        }
    }

    /** check the token */
    public function checkMobile(MobileRequest $request)
    {
        $client = (new MobileRepository())->find(mobile($request->mobile));

        if ($client == null)
            return $this->message(__('message.auth.register.wrongMobile'))->error();

        if ($client->token == trim($request->token)) {
            $user = (new UserModelRepository())->create($client);
            $tokenResult = $user->createToken('Auth Token');
            $token = $tokenResult->token;
            $token->save();

            $result = response()->json([
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ]);
        }

        return ($result) ?
            $this->message(__("message.auth.register.mobileVerified"))->data($result)->success() :
            $this->message(__('message.auth.register.wrongToken'))->error(401);
    }

}
