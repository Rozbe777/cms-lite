<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Admin\User\Traits\EditUserTrait;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    use CreateUserTrait;
    use EditUserTrait;
    public function store(CreateUserRequest $request){

        $user=$this->CreateUser(
            [
                'name'=>$request->name,
                'family'=>$request->family,
                'phone'=>$request->phone,
                'email'=>$request->email,
                'password'=>$request->password,
                'registration_source'=>$request->registration_source,

            ]
        );

        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");



    }

    public function destroy($id)
    {
        User::forceDelete($id);


        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");

    }

    public function multipleDestroy($ids)
    {
        foreach ($ids as $id)
            User::forceDelete($id);


    }



    public function edit(EditUserRequest $request)
    {


        $user=$this->EditUser([
            'name'=>$request->name,
            'family'=>$request->family,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'password'=>$request->password,
            'status'=>$request->status,
            'user_id'=>Auth::id()

        ]);

        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");


    }

    public function index(){


        $users=User::all();
        return view("panel.themes.frest.pages.user.index");

    }


}
