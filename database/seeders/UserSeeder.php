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
        $permissions = Permission::get();
        $permissions_ids= Arr::pluck($permissions , "id");

        $user_roles=[
            'admin' => [
                ['name' => "مدیر", 'last_name' => "سیستم", "email" => "cms@zerone.team", "password" => 'password', "mobile" => '09120000000'],
            ],
            'user' => [
                ['name' => "firstUser",'last_name' => "last name", "email" => "user1@gmail.com", "password" => '123456', "mobile" => '09110002000'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user2@gmail.com", "password" => '123456', "mobile" => '09110003001'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user3@gmail.com", "password" => '123456', "mobile" => '09110004002'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user4@gmail.com", "password" => '123456', "mobile" => '09110000030'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user5@gmail.com", "password" => '123456', "mobile" => '09110000050'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user6@gmail.com", "password" => '123456', "mobile" => '09110000060'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user7@gmail.com", "password" => '123456', "mobile" => '09110000100'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user8@gmail.com", "password" => '123456', "mobile" => '09110005004'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user9@gmail.com", "password" => '123456', "mobile" => '09110006005'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user10@gmail.com", "password" => '123456', "mobile" => '09118000080'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user11@gmail.com", "password" => '123456', "mobile" => '09117000010'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user13@gmail.com", "password" => '123456', "mobile" => '09116000009'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user14@gmail.com", "password" => '123456', "mobile" => '09115000009'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user15@gmail.com", "password" => '123456', "mobile" => '09114000009'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user16@gmail.com", "password" => '123456', "mobile" => '09113000009'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user17@gmail.com", "password" => '123456', "mobile" => '09112000009'],
                ['name' => "firstUser",'last_name' => "last name", "email" => "user18@gmail.com", "password" => '123456', "mobile" => '09111000009'],


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
                $user->mobile = $value['mobile'];
                $user->email_verified_at = now();
                $user->password = bcrypt("password");
                $user->save();
                $user->roles()->attach($role->id);

            }

        }


    }
}
