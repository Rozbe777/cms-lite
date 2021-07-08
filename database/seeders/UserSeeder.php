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
                ['name' => "مدیر", 'last_name' => "سیستم", "password" => 'password', "mobile" => '09120000000','group' => -2, 'image' => 'public/images/defaultIMG.png'],
            ],
            'user' => [
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user1@gmail.com", "password" => '123456', "mobile" => '09110102000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user2@gmail.com", "password" => '123456', "mobile" => '09110202000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user3@gmail.com", "password" => '123456', "mobile" => '09110402000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user4@gmail.com", "password" => '123456', "mobile" => '09110702000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user5@gmail.com", "password" => '123456', "mobile" => '09111202000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user6@gmail.com", "password" => '123456', "mobile" => '09111402000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user7@gmail.com", "password" => '123456', "mobile" => '09113202000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user8@gmail.com", "password" => '123456', "mobile" => '09114102000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user9@gmail.com", "password" => '123456', "mobile" => '09112302000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user10@gmail.com", "password" => '123456', "mobile" => '09151002000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user11@gmail.com", "password" => '123456', "mobile" => '09118002000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user12@gmail.com", "password" => '123456', "mobile" => '09110812000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user13@gmail.com", "password" => '123456', "mobile" => '09110091000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user14@gmail.com", "password" => '123456', "mobile" => '09110002000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user15@gmail.com", "password" => '123456', "mobile" => '09110031000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user16@gmail.com", "password" => '123456', "mobile" => '09110061000','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "email" => "user17@gmail.com", "password" => '123456', "mobile" => '09110005000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110003000','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002001','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002002','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002003','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002004','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002005','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002006','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002007','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002008','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002010','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002020','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002030','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002040','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002050','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002060','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002070','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002080','group' => -3,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002090','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002100','group' => -2,'image' => 'public/images/userDefault.png'],
                ['name' => "کاربر",'last_name' => "سیستم", "password" => '123456', "mobile" => '09110002200','group' => -2,'image' => 'public/images/userDefault.png'],
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
                $user->image = $value['image'];
                $user->email_verified_at = now();
                $user->password = bcrypt($value['password']);
                $user->mobile_verified_at = Carbon::now();
                $user->group = $value['group'];
                 $user->save();
                $user->roles()->attach($role->id);

            }

        }


    }
}
