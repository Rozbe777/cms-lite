<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
    }

//    public function multipleDestroy($ids)
//    {
//        $user = User::where($id);
//        $user->delete();
//    }



    public function edit(EditUserRequest $request)
    {
        $user = User::findOrFail(Auth::id());



        $user->name = $request->name;
        $user->family = $request->family;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = bcrypt($request->password);

        $user->saveOrFail();

    }

    public function index(){


        $users=User::all();
        return view("panel.themes.frest.pages.user.index");

    }


}
