<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\Repositories\Auth\UserModelRepository;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    use ResponseTrait;

    public function store(CreateUserRequest $request)
    {
        /** update User info */
        $user = (new UserModelRepository())->update($request->all(),\Request::route()->getName());

        if (is_array($user)) /** when throw an exception */
            return $this->message(__('message.auth.register.error'))->error();

        return $this->message(__('message.auth.register.successful'))->success();
    }
}
