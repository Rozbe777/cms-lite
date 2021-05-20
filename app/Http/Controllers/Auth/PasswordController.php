<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordRequest;
use App\Http\Requests\MobileRequest;
use App\Jobs\SendSmsJob;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    use MobileTrait;

    protected $userRepository;
    protected $responses;

    public function __construct(Responses $responses, UserModelRepository $userRepository)
    {
        $this->responses = $responses;
        $this->userRepository = $userRepository;
    }

    public function show()
    {
        return adminView("pages.auth.password.index");
    }

    /** verify user's mobile when ask for reset password */
    public function passwordToken(MobileRequest $request)
    {
        session(['mobile' => mobile($request->mobile)]);
        $mobileRepository = new MobileRepository();

        $user = $this->userRepository->findByMobile(session('mobile'));

        if (!$user)
            return $this->responses->notSuccess(__('message.auth.password.userNotExist'), 404);

        $client = $mobileRepository->find(session('mobile'));

        if (!$client) {
            $client = $mobileRepository->creatClient(session('mobile'));

            /** API panel SMS */
            dispatch(new SendSmsJob($request->mobile));

            return $this->responses->success(__('message.auth.register.resendToken.successful'));
        }

        /** check for the last time that we sent a token then resend it after 2 min. */
        $needToPass = 120 - (strtotime(Carbon::now()->toDateTimeString()) - strtotime((new MobileRepository())->find(session('mobile'))->updated_at->toDateTimeString()));
        if ($needToPass < 0) {
            /** send the token again */
            dispatch(new SendSmsJob($request->mobile));

            return $this->responses->success(__('message.auth.register.resendToken.successful'));
        } else {
            return $this->responses->notSuccess(__('message.auth.register.resendToken.wait') . $needToPass, 429, $needToPass);
        }
    }

    public function passwordRecoveryForm()
    {
        return adminView("pages.auth.password.update");
    }

    public function passwordRecovery(PasswordRequest $request)
    {
        $user = (new UserModelRepository())->findByMobile(session('mobile'));

        if (!$user) {
            return $this->responses->notSuccess(__("message.auth.password.userNotExist"), 404);
        } else {
            $user->password = bcrypt($request->password);
            $user->save();
            return $this->responses->success(__('message.auth.password.successful'));
        }
    }
}
