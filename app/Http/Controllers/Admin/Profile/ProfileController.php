<?php

namespace App\Http\Controllers\Admin\Profile;

use App\Classes\Responses\Admin\ResponsesTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Profile\UpdateRequest;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    use ResponsesTrait;

    function index()
    {
        $data = Auth::user();
        return adminView('pages.admin.profile.index', compact('data'));
    }

    function update(UpdateRequest $request)
    {
        $data = $request->all();
        $user = Auth::user();

        if (empty($data['mobile']))
            $data['mobile'] = $user->mobile;

        if (empty($data['email']))
            $data['email'] = $user->email;

        if (empty($data['name']))
            $data['name'] = $user->name;

        if (empty($data['last_name']))
            $data['last_name'] = $user->last_name;

        if (empty($data['password']))
            $data['password'] = $user->password;
        else
            $data['password'] = bcrypt($data['password']);

        unset($data['password_confirmation']);
        $data = $user->update($data);
        return $this->message(__('message.success.200'))->view('pages.admin.profile.index')->data($data)->success();
    }
}
