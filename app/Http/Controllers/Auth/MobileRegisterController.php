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

    public function register(MobileRequest $request)
    {
        session(['mobile' => mobile($request->mobile)]);

        /** check if mobile was registered */
        $user = $this->userRepository->findByMobile(session('mobile'));

        if (!$user) {
            /** mobile was not registered */
            $user = $this->userRepository->create(session('mobile'));

            /** API panel SMS */
            dispatch(new SendSmsJob($request->mobile, $user->id));

            return $this->responses->success("verification code is sent to mobile number");

        } elseif (isset($user->password)) {dd(2);
            /** if user has a password so the mobile number was registered completely
             * {{ Do you Forgot Your Password?? }}
             */
            return $this->responses->notSuccess("the user is existed check if forgot your password", 404);

        } else {dd(3);
            /** check for the last time that we sent a token then resend it after 2 min. */
            $needToPass = 120 - (strtotime(Carbon::now()->toDateTimeString()) - strtotime($this->mobileRepository->find($user->id)->updated_at->toDateTimeString()));

            if ($needToPass < 0) {
                /** send the token again */
                dispatch(new SendSmsJob($request->mobile, $user->id));

                return $this->responses->success("verification code is sent to mobile number");
            } else {
                return $this->responses->notSuccess("you have to wait $needToPass sec before ask again", 404, $needToPass);
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
        $user = (new UserModelRepository())->findByMobile(session('mobile'));

        /** check the mobile in trait */
        $response = $this->checkMobileTrait($user, $request->token);

        return ($response) ?
            $this->responses->success("mobile verification is done update user's info", ["id" => $user->id]) :
            $this->responses->notSuccess("token is not correct", 404);
    }

}
