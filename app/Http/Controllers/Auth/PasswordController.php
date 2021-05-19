<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordRequest;
use App\Http\Requests\MobileRequest;
use App\Jobs\SendSmsJob;
use App\Models\Repositories\Auth\UserModelRepository;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    use MobileTrait;

    protected $response;
    protected $userRepository;

    public function __construct(Responses $response, UserModelRepository $userRepository)
    {
        $this->response = $response;
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

        $user = $this->userRepository->findByMobile(session('mobile'));

        /** API panel SMS */
        dispatch(new SendSmsJob($request->mobile));

        return $this->response->success("verification code is sent to mobile number");
    }

    public function passwordRecoveryForm()
    {
        return adminView("pages.auth.password.update");
    }

    public function passwordRecovery(PasswordRequest $request)
    {
        $user = (new UserModelRepository())->findByMobile(session('mobile'));

        /** check the mobile in trait */
        $response = $this->checkMobileTrait($user, $request->token, $passReset=1);

        if (!$response){
            return $this->response->notSuccess("the token is not correct",404);
        }else{
            $user->password = bcrypt($request->password);
            $user->save();
            return $this->response->success("the password is changed");
        }
    }
}
