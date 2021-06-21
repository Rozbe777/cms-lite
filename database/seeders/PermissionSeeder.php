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
                    'icon' => 'bx-home-alt',
                    'is_menu' => 1,
                    "name" => "dashboard.index",
                    "display_name" => "پیشخوان",
                    "children" => []
                ],
                [
                    'weight' => 5,
                    'icon' => 'bx-detail',
                    'is_menu' => 1,
                    "name" => "contents.blade",
                    "display_name" => "محتوا ها",
                    "children" => [
                        [
                            'icon' => 'bx-sitemap',
                            'is_menu' => 1,
                            "name" => "categories.index",
                            "display_name" => "دسته بندی ها"],
                    ]
                ],
                [
                    'weight' => 10,
                    'icon' => 'bx-cart-alt',
                    'is_menu' => 1,
                    "name" => "products.blade",
                    "display_name" => "فروشگاه",
                    "children" => []
                ],
                [
                    'weight' => 100,
                    'icon' => 'bx-square-rounded',
                    'is_menu' => 1,
                    "name" => "pages.blade",
                    "display_name" => "صفحات",
                    "children" => []
                ],
                [
                    'icon' => 'bx-group',
                    'weight' => 500,
                    'is_menu' => 1,
                    "name" => "users.blade",
                    "display_name" => "کاربران",
                    "children" => [
                        [
                            'icon' => 'bx-user-plus',
                            'is_menu' => 1,
                            "name" => "users.create",
                            "display_name" => "افزودن کاربر"
                        ],
                        [
                            'icon' => 'bx-directions',
                            'is_menu' => 1,
                            "name" => "roles.index",
                            "display_name" => "دسترسی"
                        ],
                    ],
                ],
                [
                    'weight' => 100,
                    'icon' => 'bx-cog',
                    'is_menu' => 1,
                    "name" => "settings.edit",
                    "display_name" => "تنظیمات",
                    "children" => [
                        [
                            'icon' => 'bx-desktop',
                            'is_menu' => 1,
                            "name" => "theme.index",
                            "display_name" => "انتخاب پوسته"
                        ]
                    ]
                ],
                [
                    'weight' => 1500,
                    'icon' => 'bx-user',
                    'is_menu' => 0,
                    "name" => "profile.edit",
                    "display_name" => "حساب کاربری",
                    "children" => [
                        [
                            'icon' => 'bx-key',
                            'is_menu' => 1,
                            "name" => "profile.password",
                            "display_name" => "ویرایش رمزعبور"
                        ],
                    ],
                ],

            ];

        $this->permissionCreator($permissions);

    }

}
