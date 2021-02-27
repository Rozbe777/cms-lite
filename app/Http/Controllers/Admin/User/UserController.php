<?php

namespace App\Http\Controllers\Admin\User;

use App\Exports\UserListExport;
use App\Http\Controllers\Admin\User\Traits\EditUserTrait;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\EditUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;


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
        $user->attachRole('');

        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");



    }

    public function create()
    {
        return view("panel.themes.frest.pages.user.create");
    }

    public function edit($userId)
    {
        $user=User::findOrFail($userId);
        return view("panel.themes.frest.pages.user.edit")->with('user',$user);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();


        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");

    }

    public function multipleDestroy($ids)
    {
        foreach ($ids as $id)
            User::forceDelete($id);


    }



    public function update(EditUserRequest $request,$userId)
    {
//|unique:users,email,'.$this->request->get("userId")
        $user=$this->EditUser([
            'name'=>$request->name,
            'family'=>$request->family,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'password'=>$request->password,
            'status'=>$request->status,
            'user_id'=>$userId

        ]);

        return redirect(route("admin.user.edit",$userId))->with("msg", "عملیات با موفقیت انجام شد");


    }

    public function index(){
        $users=User::all();
        return view("panel.themes.frest.pages.user.index")->with('users',$users);

    }

    public function export(){
        $fileName="usersList".".xlsx";

        return Excel::download(new UserListExport(), $fileName);

    }


}
