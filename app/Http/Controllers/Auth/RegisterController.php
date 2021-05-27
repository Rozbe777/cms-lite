<?php

namespace App\Http\Controllers\Auth;

use App\Classes\Responses\Auth\Responses;
use App\Classes\Responses\Auth\ResponseTrait;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\Repositories\Auth\UserModelRepository;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    use CreateUserTrait, ResponseTrait;

    public function __construct()
    {
        $this->middleware('blockLogin');
    }

    public function show()
    {
        return adminView("pages.auth.register");
    }

    public function store(CreateUserRequest $request)
    {
        /** update User info */
        $user = (new UserModelRepository())->update($request);

        $response = new Responses();

        if (is_array($user)) /** when throw an exception */
            return $this->message(__('message.auth.register.error'))->error();

        return $this->view('pages.dashboard.index')->message(__('message.auth.register.successful'))->data($response)->success();
    }


}
