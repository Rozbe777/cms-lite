<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CreateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{

    public function register(){
        return view("panel.themes.frest.pages.auth.register");
    }



    public function store(CreateUserRequest $request){
        dd("salam");
        $user = new User();
        $user->name = $request->name;
        $user->family = $request->family;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->email_verified_at = now();
        $user->status = "active";
        if ($request->registration_source)
            $user->registration_source = $request->registration_source;
        $user->password = bcrypt($request->password);
        $user->saveOrFail();

        dd($user);
        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");



    }


}
