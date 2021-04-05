<?php

namespace App\Http\Controllers\Admin\User;

use App\Exports\UserListExport;
use App\Http\Controllers\Admin\User\Helper\UserSearchHelper;
use App\Http\Controllers\Admin\User\Traits\EditUserTrait;
use App\Http\Controllers\Auth\Traits\CreateUserTrait;
use App\Http\Requests\Admin\User\multipleDestroyRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\CreateUserRequest;
use App\Http\Requests\Admin\User\EditUserRequest;
use App\Http\Requests\Admin\User\SearchUserRequest;
use App\Jobs\ExportUsersExcelJob;
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
                'name'=>$request->input('name'),
                'last_name'=>$request->input('last_name'),
                'phone'=>$request->input('phone'),
                'email'=>$request->input('email'),
                'password'=>$request->input('password'),
                'registration_source'=>$request->input('registration_source','web'),

            ]
        );
        $user->roles()->attach($request->input('role_id'));

        return success([],'کاربر جدید ایجاد شد.');



    }

    public function create()
    {
        $roles=Role::all();
        return adminView("pages.admin.user.create")->with("roles",$roles);
    }

    public function edit($userId)
    {
        $user=User::findOrFail($userId);
        $roles=Role::all();
        return adminView("pages.admin.user.edit")->with("user",$user)->with("roles",$roles);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return redirect(route("admin.user.index"))->with("info", "عملیات حذف کاربر موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->userIds))
            User::whereIn('id',$request->input('userIds'))->delete();

        return redirect(route("admin.user.index"))->with('info','کاربران انتخاب شده حذف شدند');

    }



    public function update(EditUserRequest $request,$userId)
    {
//|unique:users,email,'.$this->request->get("userId")
        $user=$this->EditUser([
            'name'=>$request->name,
            'last_name'=>$request->last_name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'password'=>$request->password,
            'status'=>$request->status,
            'user_id'=>$userId

        ]);
        if (Auth::user()->roles()->first()->name == "admin") {
            $user->roles()->sync($request->input('role'));
        }

        return redirect(route("admin.user.edit",$userId))->with("info", "عملیات ویرایش کاربر با موفقیت انجام شد");
    }

    public function search(SearchUserRequest $request){
        $searchHelper=new UserSearchHelper($request);
        $users=$searchHelper->searchAndRoleUsers();
        $users=$searchHelper->confirmedUsers($users);
        $users=$searchHelper->statusUsers($users);
        return adminView("pages.admin.user.index")->with('users',$users);
    }

    public function index(){
        return adminView("pages.admin.user.index");
    }

    public function userList(){
        $users=User::paginate(7);//TODO paginate can change
        return $users;
    }

    public function export(){
        $users=User::all();
        dispatch(new ExportUsersExcelJob($users));
        return redirect(route('admin.user.index'));
    }


}
