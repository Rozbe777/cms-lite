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
                ['name' => "مدیر", 'last_name' => "سیستم", "email" => "cms@zerone.team", "password" => 'password', "mobile" => '09120000000'],
            ],
            'user' => [
                ['name' => "firstUser",'last_name' => "last name", "email" => "user1@gmail.com", "password" => '123456', "mobile" => '09110102000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user2@gmail.com", "password" => '123456', "mobile" => '09110202000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user3@gmail.com", "password" => '123456', "mobile" => '09110402000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user4@gmail.com", "password" => '123456', "mobile" => '09110702000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user5@gmail.com", "password" => '123456', "mobile" => '09111202000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user6@gmail.com", "password" => '123456', "mobile" => '09111402000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user7@gmail.com", "password" => '123456', "mobile" => '09113202000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user8@gmail.com", "password" => '123456', "mobile" => '09114102000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user9@gmail.com", "password" => '123456', "mobile" => '09112302000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user10@gmail.com", "password" => '123456', "mobile" => '09151002000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user11@gmail.com", "password" => '123456', "mobile" => '09118002000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user12@gmail.com", "password" => '123456', "mobile" => '09110812000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user13@gmail.com", "password" => '123456', "mobile" => '09110091000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user14@gmail.com", "password" => '123456', "mobile" => '09110002000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user15@gmail.com", "password" => '123456', "mobile" => '09110031000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user16@gmail.com", "password" => '123456', "mobile" => '09110061000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user17@gmail.com", "password" => '123456', "mobile" => '09110005000'],
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
                $user->email = $value['email'];
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
