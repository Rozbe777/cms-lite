<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Classes\Notifier\Classes\NoticeCenterTrigger;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordRequest;
use App\Http\Requests\MobileRegisterRequest;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\User;
use App\Models\VerifyMobile;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    use ResponseTrait;

    public function passwordToken(MobileRegisterRequest $request)
    {
        $noticeCenterTrigger = new NoticeCenterTrigger();

        $mobile = mobile($request->mobile);
        $mobileRepository = new MobileRepository();

        $user = User::whereMobile($mobile)->first();

        if (!$user)
            return $this->message(__('message.auth.password.userNotExist'))->error(401);

        $client = $mobileRepository->find($mobile);

        if (!$client) {
            $client = VerifyMobile::orderBy('id','desc')->firstWhere('mobile', $mobile);

            /** API panel SMS */
            $noticeCenterTrigger->handle($request->mobile);

            return $this->message(__('message.auth.register.resendToken.successful'))->success();
        }

        /** check for the last time that we sent a token then resend it after 2 min. */
        $needToPass = config('kavenegar.waitTimer') - (strtotime(Carbon::now()->toDateTimeString()) - strtotime((new MobileRepository())->find($mobile)->updated_at->toDateTimeString()));
        if ($needToPass < 0) {
            /** send the token again */
            $noticeCenterTrigger->handle($request->mobile);

            return $this->message(__('message.auth.register.resendToken.successful'))->success();
        } else {
            return $this->data($needToPass)->message(__('message.auth.register.resendToken.wait') . $needToPass)->error(429);
        }
    }

    public function passwordRecovery(PasswordRequest $request)
    {
        dd($request->user());
    }
}
