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
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002000'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002001'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002002'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002003'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002004'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002005'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002006'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002007'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002008'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002010'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002020'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002030'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002040'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002050'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002060'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002070'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002080'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002090'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002100'],
                ['name' => "firstUser",'last_name' => "last name", "password" => '123456', "mobile" => '09110002200'],
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
