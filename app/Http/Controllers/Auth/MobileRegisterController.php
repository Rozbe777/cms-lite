<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Classes\Sms\SmsCenter;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\MobileRequest;
use App\Jobs\SendSmsJob;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\SmsRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\VerifyMobile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Laravel\Passport\Bridge\UserRepository;

class MobileRegisterController extends Controller
{
    use MobileTrait;

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

    public function register(MobileRequest $request)
    {
        session(['mobile' => mobile($request->mobile)]);

        /** check if mobile was registered */
        $user = $this->userRepository->findByMobile(session('mobile'));
        $client = $this->mobileRepository->find(session('mobile'));

        if ((!$user && !$client) || (!isset($user->password) && !$client)) {
            /** mobile was not registered */
            $client = $this->mobileRepository->creatClient(session('mobile'));

            /** API panel SMS */
            dispatch(new SendSmsJob($request->mobile));

            return $this->responses->success(__('message.auth.register.resendToken.successful'));

        } elseif ($user && isset($user->password)) {
            /** if user has a password so the mobile number was registered completely
             * {{ Do you Forgot Your Password?? }}
             */
            return $this->responses->notSuccess(__("message.auth.register.alreadyRegistered"), 201);

        } elseif (($user && !isset($user->password)) || $client) {
            /** check for the last time that we sent a token then resend it after 2 min. */
            $needToPass = 120 - (strtotime(Carbon::now()->toDateTimeString()) - strtotime($this->mobileRepository->find(session('mobile'))->updated_at->toDateTimeString()));

            if ($needToPass < 0) {
                /** send the token again */
                dispatch(new SendSmsJob($request->mobile));

                return $this->responses->success(__('message.auth.register.resendToken.successful'));
            } else {
                return $this->responses->notSuccess(__('message.auth.register.resendToken.wait').$needToPass, 429, $needToPass);
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
        $client = (new MobileRepository())->find(session('mobile'));

        /** check the mobile in trait */
        $response = $this->checkMobileTrait($client, $request->token);

        return ($response) ?
            $this->responses->success(__("message.auth.register.mobileVerified"), ["id" => $response->id]) :
            $this->responses->notSuccess(__('message.auth.register.wrongToken'), 404);
    }

}
