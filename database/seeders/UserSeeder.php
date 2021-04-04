<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_roles=[];
        $role_map_persian=[
        ];
        $permissions = Permission::get();
        $permissions_id= Arr::pluck($permissions , "id");
        $role = new Role();
        $role->name = "admin";
        $role->display_name = "مدیر کل";
        $role->save();
        $role->permissions()->attach($permissions_id);

        $user = new User();
        $user->name = "مدیر";
        $user->last_name = "سیستم";
        $user->email = "cms@zerone.team";
        $user->phone = "09120000000";
        $user->email_verified_at = now();
        $user->password = bcrypt("password");
        $user->save();
        $user->roles()->attach($role->id);

        $role = new Role();
        $role->name = "user";
        $role->display_name = "کاربر";
        $role->save();
        $role->permissions()->attach(1);


    }
}
