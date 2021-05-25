<?php

namespace Database\Seeders;

use App\Classes\Admin\Traits\PermissionCreator;
use App\Models\Permission;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    use PermissionCreator;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $permissions =
            [
                [
                    'weight' => 1,
                    'icon' => 'flaticon-multiple-users-silhouette',
                    'is_menu' => 1,
                    "name" => "dashboard.index",
                    "display_name" => "پیشخوان",
                    "children" => []
                ],
                [
                    'weight' => 10,
                    'icon' => 'flaticon-multiple-users-silhouette',
                    'is_menu' => 1,
                    "name" => "user.index",
                    "display_name" => "کاربران",
                    "children" => [
                        [
                            'is_menu' => 1,
                            "name" => "user.create",
                            "display_name" => "افزودن کاربر"
                        ],
                    ]
                ],
            ];


        $this->permissionCreator($permissions);

    }


}
