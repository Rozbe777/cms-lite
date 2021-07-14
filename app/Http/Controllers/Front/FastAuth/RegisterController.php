<?php

namespace App\Http\Controllers\Front\FastAuth;

use App\Classes\Notifier\Classes\NoticeCenterTrigger;
use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Auth\Traits\MobileTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Front\fastAuth\CreateUserRequest;
use App\Http\Requests\MobileRegisterRequest;
use App\Http\Requests\MobileRequest;
use App\Models\Address;
use App\Models\Repositories\Auth\MobileRepository;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    use ResponseTrait, MobileTrait;

    protected $mobileRepository;

    public function __construct(MobileRepository $mobileRepository)
    {
        $this->middleware('blockLogin');
        $this->mobileRepository = $mobileRepository;
    }

    public function show()
    {
        return frontView('pages.fastAuth.register');
    }

    public function mobile(MobileRegisterRequest $request)
    {
        $result = $this->mobileCheck($request->input('mobile'));

        if ($result['status'] == 'info')
            return $this->message($result['message'])->success(201);

        if ($result['status'] == 'warn')
            return $this->message($result['message'])->data($result['data'])->success(202);

        return $result;
    }

    public function mobileVerify(MobileRequest $request)
    {
        $client = $this->mobileRepository->find(mobile($request->mobile));

        if ($client == null)
            return $this->message(__('message.auth.register.wrongMobile'))->error();

        /** check the mobile*/
        $response = $this->checkMobileTrait($client, trim($request->input('token')), 'front');

        return ($response) ?
            $this->message(__("message.auth.register.mobileVerified"))->data($response)->success():
            $this->message(__('message.auth.register.wrongToken'))->error(401);
    }

    public function store(CreateUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = (new UserModelRepository())->update($request);

            $data = $request->only('phone', 'postal_code', 'state', 'city', 'address');
            $data['user_id'] = $user->id;

            $address = Address::create($data);
            DB::commit();
        } catch (\Exception $ex) {
            DB::rollBack();
            throw $ex;
        }
        /** update User info */
        if (is_array($user)) /** when throw an exception */
            return $this->message(__('message.auth.register.error'))->error();

        Auth::login();
        return $this->message(__('message.auth.register.successful'))->success();
    }

    public function mobileCheck($mobile)
    {
        $mobile = mobile($mobile);

        /** check if mobile was registered */
        $user = UserModelRepository::findByMobile($mobile);
        $client = $this->mobileRepository->find($mobile);

        if ((!$user && !$client) || (!isset($user->password) && !$client)) {

            $client = $this->mobileRepository->creatClient($mobile);
            /** mobile was not registered */
            $message = $this->mobileRegister($mobile);
            return [
                'status' => 'done',
                'message' => $message,
            ];

        } elseif ($user && isset($user->password)) {
            /**{{ Do you Forgot Your Password?? }}*/
            return [
                'status' => 'info',
                'message' => __("message.auth.register.alreadyRegistered"),
            ];

        } elseif (($user && !isset($user->password)) || $client) {
            /** check for the last time that we sent a token then resend it after 2 min. */
            $needToPass = config('kavenegar.waitTimer') - (strtotime(Carbon::now()->toDateTimeString()) - strtotime($this->mobileRepository->find($mobile)->updated_at->toDateTimeString()));

            if ($needToPass < 0) {
                /** send the token again */
                $this->mobileRegister($mobile);

                return [
                    'status' => 'done',
                    'message' => $this->mobileRegister($mobile),
                ];
            } else {
                return [
                    'status' => 'warn',
                    'message' => __('message.auth.register.resendToken.wait') . $needToPass,
                    'data' => $needToPass
                ];
            }
        }
    }

    public function mobileRegister($mobile)
    {
        /** API panel SMS */
        NoticeCenterTrigger::handle($mobile);

        return __('message.auth.register.resendToken.successful');
    }
}
