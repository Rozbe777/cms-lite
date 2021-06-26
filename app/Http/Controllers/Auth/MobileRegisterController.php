<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Notifier\Classes\NoticeCenterTrigger;
use App\Classes\Notifier\UserOtp;
use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Classes\Sms\SmsCenter;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\MobileRegisterRequest;
use App\Http\Requests\MobileRequest;
use App\Jobs\SendSmsJob;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\SmsRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\VerifyMobile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\UserRepository;

class MobileRegisterController extends Controller
{
    use MobileTrait, ResponseTrait;

    protected $userRepository;
    protected $sms;
    protected $mobileRepository;
    protected $responses;

    public function __construct(Responses $responses, UserModelRepository $userRepository, SmsRepository $sms, MobileRepository $mobileRepository)
    {
        $this->userRepository = $userRepository;
        $this->sms = $sms;
        $this->mobileRepository = $mobileRepository;
        $this->responses = $responses;
    }

    public function show()
    {
        return adminView("pages.auth.mobile.index");
    }

    /** verify user's mobile */
    public function register(MobileRegisterRequest $request)
    {
        $noticeCenterTrigger = new NoticeCenterTrigger();
        $mobile = mobile($request->mobile);

        /** check if mobile was registered */
        $user = $this->userRepository->findByMobile($mobile);
        $client = $this->mobileRepository->find($mobile);

        if ((!$user && !$client) || (!isset($user->password) && !$client)) {
            /** mobile was not registered */
            $client = $this->mobileRepository->creatClient($mobile);

            /** API panel SMS */
            $noticeCenterTrigger->handle($request->mobile);

            return $this->message(__('message.auth.register.resendToken.successful'))->success();

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
                $noticeCenterTrigger->handle($request->mobile);

                return $this->message(__('message.auth.register.resendToken.successful'))->success();
            } else {
                return $this->message(__('message.auth.register.resendToken.wait') . $needToPass)->data($needToPass)->error(429);
            }
        }
    }

    public function verificationForm()
    {
        return adminView("pages.auth.tokenVerification");
    }

    /** check the token */
    public function checkMobile(MobileRequest $request)
    {
        $client = (new MobileRepository())->find(mobile($request->mobile));

        if ($client == null)
            return $this->message(__('message.auth.register.wrongMobile'))->error();

        /** check the mobile in trait */
        $response = $this->checkMobileTrait($client, trim($request->token));

        return ($response) ?
            ($response->wasRecentlyCreated) ?
                $this->view("pages.auth.register")->message(__("message.auth.register.mobileVerified"))->data($response)->success() :
                $this->view("pages.auth.update")->message(__("message.auth.register.mobileVerified"))->data($response)->success() :
            $this->message(__('message.auth.register.wrongToken'))->error(401);
    }

}
