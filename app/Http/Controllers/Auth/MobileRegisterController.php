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
        $client = $this->userRepository->findByMobile(session('mobile'));

        if (!$client) {
            /** mobile was not registered */
            $this->userRepository->createClient(session('mobile'));

            /** API panel SMS */
            dispatch(new SendSmsJob($request->mobile));

            return $this->responses->success(__('message.auth.register.resendToken.successful'));

        } else {
            /** check for the last time that we sent a token then resend it after 2 min. */
            $needToPass = 120 - (strtotime(Carbon::now()->toDateTimeString()) - strtotime($this->mobileRepository->find($user->id)->updated_at->toDateTimeString()));

            if ($needToPass < 0) {
                /** send the token again */
                dispatch(new SendSmsJob($request->mobile));

                return $this->responses->success(__('message.auth.register.resendToken.successful'));
            } else {
                return $this->responses->notSuccess(__('message.auth.register.resendToken.successful') . $needToPass, 429, $needToPass);
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
        $client = (new UserModelRepository())->findByMobile(session('mobile'));

        /** check the mobile in trait */
        $response = $this->checkMobileTrait($client, $request->token);

        if (!$response)
            return $this->responses->notSuccess("token is not correct", 404);

        $user = $this->userRepository->createUser();
        VerifyMobile::destroy($client->id);
        return $this->responses->success("mobile verification is done update user's info", ["id" => $user->id]);

    }

}
