<?php

namespace App\Http\Controllers\Admin\User;

use App\Exports\UserListExport;
use App\Http\Controllers\Admin\User\Helper\UserSearchHelper;
use App\Http\Controllers\Admin\User\Traits\EditUserTrait;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\EditUserRequest;
use App\Http\Requests\Admin\User\SearchUserRequest;
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
        $user->attachRole('user');
        $user->roles()->attach($request->role);

        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");



    }

    public function create()
    {
        $roles=Role::all();
        return view("panel.themes.frest.pages.admin.user.create")->with("roles",$roles);
    }

    public function edit($userId)
    {
        $user=User::findOrFail($userId);
        $roles=Role::all();
        return view("panel.themes.frest.pages.admin.user.edit")->with("user",$user)->with("roles",$roles);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();


        return redirect(route("admin.user.index"))->with("msg", "عملیات با موفقیت انجام شد");

    }

    public function multipleDestroy(Request $request)
    {

        if (isset($request->userIds))
        foreach ($request->userIds as $id)
            User::findOrFail($id)->delete();


        return redirect(route("admin.user.index"))->with('msg','کاربران انتخاب شده حذف شدند');


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
        if (Auth::user()->roles()->first()->name == "admin") {
            $user->roles()->sync($request->role);
        }

        return redirect(route("admin.user.edit",$userId))->with("msg", "عملیات با موفقیت انجام شد");


    }

    public function search(SearchUserRequest $request){
        $searchHelper=new UserSearchHelper($request);
        $users=$searchHelper->searchAndRoleUsers();
        $users=$searchHelper->confirmedUsers($users);
        $users=$searchHelper->statusUsers($users);
        return view("panel.themes.frest.pages.admin.user.index")->with('users',$users);

    }

    public function index(){
        $users=User::paginate(12);
        return view("panel.themes.frest.pages.admin.user.index")->with('users',$users);

    }

    public function export(){
        $fileName="usersList".".xlsx";

        return Excel::download(new UserListExport(), $fileName);

    }


}
