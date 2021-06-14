<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Notifier\Classes\NoticeCenterTrigger;
use App\Classes\Notifier\UserOtp;
use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordRequest;
use App\Http\Requests\MobileRegisterRequest;
use App\Http\Requests\MobileRequest;
use App\Jobs\SendSmsJob;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\SmsRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PasswordController extends Controller
{
    use MobileTrait, ResponseTrait;

    protected $userRepository;
    protected $responses;
    protected $noticeCenterTrigger;

    public function __construct(Responses $responses, UserModelRepository $userRepository, NoticeCenterTrigger $noticeCenterTrigger)
    {
        $this->responses = $responses;
        $this->userRepository = $userRepository;
        $this->noticeCenterTrigger = $noticeCenterTrigger;
    }

    public function show()
    {
        return adminView("pages.auth.password.index");
    }

    /** verify user's mobile when ask for reset password */
    public function passwordToken(MobileRegisterRequest $request)
    {
        $mobile = mobile($request->mobile);
        $mobileRepository = new MobileRepository();

        $user = $this->userRepository->findByMobile($mobile);

        if (!$user)
            return $this->message(__('message.auth.password.userNotExist'))->error(401);

        $client = $mobileRepository->find($mobile);

        if (!$client) {
            $client = $mobileRepository->creatClient($mobile);

            /** API panel SMS */
//            dispatch(new SendSmsJob($request->mobile));

            $this->noticeCenterTrigger->handle($request->mobile);

            return $this->message(__('message.auth.register.resendToken.successful'))->success();
        }

        /** check for the last time that we sent a token then resend it after 2 min. */
        $needToPass = config('kavenegar.waitTimer') - (strtotime(Carbon::now()->toDateTimeString()) - strtotime((new MobileRepository())->find($mobile)->updated_at->toDateTimeString()));
        if ($needToPass < 0) {
            /** send the token again */
//            dispatch(new SendSmsJob($request->mobile));
            $this->noticeCenterTrigger->handle($request->mobile);

            return $this->message(__('message.auth.register.resendToken.successful'))->success();
        } else {
            return $this->data($needToPass)->message(__('message.auth.register.resendToken.wait') . $needToPass)->error(429);
        }
    }

    public function passwordRecoveryForm()
    {
        return adminView("pages.auth.password.update");
    }

    public function passwordRecovery(PasswordRequest $request)
    {
        $user = Auth::user();

        if (!$user) {
            return $this->message(__("message.auth.password.userNotExist"))->error();
        } else {
            $user->password = bcrypt(trim($request->password));
            $user->save();
            return $this->view('pages.dashboard.index')->message(__('message.auth.password.successful'))->data($user)->success();
        }
    }
}
