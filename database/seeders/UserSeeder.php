<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
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
        $permissions = Permission::get();
        $permissions_ids= Arr::pluck($permissions , "id");

        $user_roles=[
            'admin' => [
                ['name' => "مدیر", 'last_name' => "سیستم", "password" => 'password', "mobile" => '09120000000'],
            ],
            'user' => [
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user1@gmail.com", "password" => '123456', "mobile" => '09110102000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user2@gmail.com", "password" => '123456', "mobile" => '09110202000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user3@gmail.com", "password" => '123456', "mobile" => '09110402000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user4@gmail.com", "password" => '123456', "mobile" => '09110702000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user5@gmail.com", "password" => '123456', "mobile" => '09111202000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user6@gmail.com", "password" => '123456', "mobile" => '09111402000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user7@gmail.com", "password" => '123456', "mobile" => '09113202000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user8@gmail.com", "password" => '123456', "mobile" => '09114102000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user9@gmail.com", "password" => '123456', "mobile" => '09112302000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user10@gmail.com", "password" => '123456', "mobile" => '09151002000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user11@gmail.com", "password" => '123456', "mobile" => '09118002000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user12@gmail.com", "password" => '123456', "mobile" => '09110812000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user13@gmail.com", "password" => '123456', "mobile" => '09110091000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user14@gmail.com", "password" => '123456', "mobile" => '09110002000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user15@gmail.com", "password" => '123456', "mobile" => '09110031000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user16@gmail.com", "password" => '123456', "mobile" => '09110061000'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user17@gmail.com", "password" => '123456', "mobile" => '09110005000'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110003000'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002001'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002002'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002003'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002004'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002005'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002006'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002007'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002008'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002010'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002020'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002030'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002040'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002050'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002060'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002070'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002080'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002090'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002100'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002200'],
            ],
        ];
        $role_map_persian=[
            'user' => 'کاربر',
            'admin' => 'مدیرکل',
        ];
        $mapRolePersian=collect($role_map_persian);
        foreach ($user_roles as $module => $values){
            $role = new Role();
            $role->name = $module;
            $role->display_name = $mapRolePersian->get($module);
            $role->save();
            if ($module=="admin")
            $role->permissions()->attach($permissions_ids);

            foreach ($values as $value){

                $user = new User();
                $user->name = $value['name'];
                $user->last_name = $value['last_name'];
                $user->status = 'active';
                $user->mobile = mobile($value['mobile']);
                $user->email_verified_at = now();
                $user->password = bcrypt($value['password']);
                $user->mobile_verified_at = Carbon::now();
                $user->save();
                $user->roles()->attach($role->id);

            }

        }


    }
}
