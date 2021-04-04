<?php

namespace Database\Seeders;

use App\Classes\Admin\Traits\PermissionCreator;
use App\Models\Permission;
use Cassandra\Schema;
use Illuminate\Database\Seeder;

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
        $permissions = [

            'admin.dashboard' => [
                'icon' => 'flaticon-dashboard',
                'display_name' => 'پیشخوان',
                'description' => '(بخش مدیر)',
                'access' => 'i',
                'is_menu' => 'i',
                'children' => []
            ],
            'admin.user' => [
                'icon' => 'flaticon-multiple-users-silhouette',
                'display_name' => 'کاربران',
                'description' => '(بخش مدیر)',
                'access' => 'export,i,c,s,e,u,des,search,multides,userList',
                'is_menu' => 'i,c',
                'children' => [
                    'admin.role' => [
                        'icon' => 'flaticon-multiple-users-silhouette',
                        'display_name' => 'دسترسی',
                        'description' => '(بخش مدیر)',
                        'access' => 'i,c,s,e,u,des',
                        'is_menu' => 'i',
                    ]
                ]
            ],
            'admin.profile' => [
                'display_name' => 'پروفایل',
                'description' => 'نمایش و ویرایش پروفایل کاربر',
                'access' => 'i,u',
//                'is_menu' => '',
                'children' => [
                    'admin.profile.password' => [
                        'display_name' => 'تغییررمز عبور',
                        'description' => 'تغییر رمزعبور حساب کاربری',
                        'access' => 'u',
//                        'is_menu' => '',
                    ],
                ]
            ],
            'admin.content' => [
                'display_name' => 'محتوا',
                'description' => 'نمایش و ویرایش محتوا',
                'access' => 'i,c,s,e,u,des,search,multides',
                'is_menu' => 'i,c',
                'children' => [
                    'admin.category' => [
                        'display_name' => 'دسته بندی',
                        'description' => 'نمایش و ویرایش دسته بندی',
                        'access' => 'i,c,s,e,u,des,search,multides',
                        'is_menu' => 'i,c',
                    ],
                    'admin.tag' => [
                        'display_name' => 'برچسب',
                        'description' => 'نمایش و ویرایش برچسب',
                        'access' => 'i,c,s,e,u,des,search,multides',
                        'is_menu' => 'i,c',
                    ],
                ]
            ],
            'admin.setting' => [
                'display_name' => 'تنظیمات',
                'description' => '(بخش مدیر)',
                'access' => 'i,u',
                'is_menu' => 'i',
                'icon'=>'bx bx-cog',
                'children' => []
            ],

        ];

        $permissions_map=[
            's' => 'store',
            'i' => 'index',
            'c' => 'create',
            'u' => 'update',
            'e' => 'edit',
            'd' => 'delete',
            'des' => 'destroy',
            'multides' => 'multipleDestroy',
            'r' => 'read',
            'sh' => 'show',
            'export' => 'export',
            'search' => 'search',
            'userList'=>'userList'
        ];

        $permissions_map_persian=[
            's' => 'ایجاد',
            'i' => 'لیست',
            'c' => 'صفحه ایجاد',
            'u' => 'به روز رسانی',
            'e' => 'صفحه به روز رسانی',
            'd' => 'صفحه حذف',
            'des' => 'حذف',
            'multides' => ' حذف گروهی',
            'r' => 'خواندن',
            'sh' => 'نمایش',
            'export' => 'خروجی',
            'search' => 'جستجو',
        ];
        $mapPermission=collect($permissions_map);
        $mapPermissionPersian=collect($permissions_map_persian);

        $this->permissionCreator($permissions,$mapPermission,$mapPermissionPersian);

    }


}
