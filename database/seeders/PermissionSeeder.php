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
                    'weight' => 5,
                    'icon' => 'flaticon-multiple-users-silhouette',
                    'is_menu' => 1,
                    "name" => "contents.index",
                    "display_name" => "محتوا",
                    "children" => []
                ],
                [
                    'weight' => 10,
                    'icon' => 'flaticon-multiple-users-silhouette',
                    'is_menu' => 1,
                    "name" => "pages.index",
                    "display_name" => "صفحات",
                    "children" => []
                ],
                [
                    'weight' => 15,
                    'icon' => 'flaticon-multiple-users-silhouette',
                    'is_menu' => 1,
                    "name" => "users.index",
                    "display_name" => "کاربران",
                    "children" => [
                        [
                            'is_menu' => 1,
                            "name" => "users.create",
                            "display_name" => "افزودن کاربر"
                        ],
                        [
                            'is_menu' => 1,
                            "name" => "roles.create",
                            "display_name" => "دسترسی"
                        ],
                    ],
                ],
//                [
//                    'weight' => 20,
//                    'icon' => 'flaticon-multiple-users-silhouette',
//                    'is_menu' => 1,
//                    "name" => "settings.index",
//                    "display_name" => "تنظیمات",
//                    "children" => []
//                ],
//                    [
//                        'weight' => 1000,
//                        'icon' => 'flaticon-multiple-users-silhouette',
//                        'is_menu' => 1,
//                        "name" => "dashboard.index",
//                        "display_name" => "حساب کاربری",
//                        "children" => [
//                            [
//                                'is_menu' => 1,
//                                "name" => "user.create",
//                                "display_name" => "اطلاعات"
//                            ],
//                            [
//                                'is_menu' => 1,
//                                "name" => "user.create",
//                                "display_name" => "ویرایش رمزعبور"
//                            ],
//                            [
//                                'is_menu' => 1,
//                                "name" => "user.create",
//                                "display_name" => "ویرایش تصویر پروفایل"
//                            ],
//                        ]
//                    ]
//                ],
        ];
//
        //---------
//        $permissions_map=[
//            's' => 'store',
//            'i' => 'index',
//            'c' => 'create',
//            'u' => 'update',
//            'e' => 'edit',
//            'd' => 'delete',
//            'des' => 'destroy',
//            'multides' => 'multipleDestroy',
//            'r' => 'read',
//            'sh' => 'show',
//            'export' => 'export',
//            'search' => 'search',
//            'userList'=>'userList'
//        ];
//
//        $permissions_map_persian=[
//            's' => 'ایجاد',
//            'i' => 'لیست',
//            'c' => 'صفحه ایجاد',
//            'u' => 'به روز رسانی',
//            'e' => 'صفحه به روز رسانی',
//            'd' => 'صفحه حذف',
//            'des' => 'حذف',
//            'multides' => ' حذف گروهی',
//            'r' => 'خواندن',
//            'sh' => 'نمایش',
//            'export' => 'خروجی',
//            'search' => 'جستجو',
//        ];
//        $mapPermission=collect($permissions_map);
//        $mapPermissionPersian=collect($permissions_map_persian);

        $this->permissionCreator($permissions);


    }


}
