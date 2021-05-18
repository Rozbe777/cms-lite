<?php

return [
    'role_structure' => [
        'admin' => [
            'admin.dashboard' => [
                'display_name' => 'پیشخوان',
                'description' => '(بخش مدیر)',
                'access' => 'i',
                'is_menu' => 'i',
                'children' => []
            ],
            'admin.user' => [
                'display_name' => 'کاربران',
                'description' => '(بخش مدیر)',
                'access' => 'export,i,c,s,e,u,des,search,multides',
                'is_menu' => 'i,c',
                'children' => [
                    'admin.role' => [
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

        ],
        'user' => [
//            'admin.role' =>[
//                'display_name'=>'دسترسی',
//                'description'=>'(بخش مدیر)',
//                'access'=>'i,c,s,e,u,des',
//                'is_menu'=>'i',
//            ],
            'admin.dashboard' => [
                'display_name' => 'پیشخوان',
                'description' => '(بخش مدیر)',
                'access' => 'i',
                'is_menu' => 'i',
                'children' => []
            ],
        ],
    ],
    'user_roles' => [
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
    ],
    'permissions_map' => [
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

    ],
    'permissions_map_persian' => [
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
    ],
    'role_map_persian' => [
        'user' => 'کاربر',
        'admin' => 'مدیرکل',
    ]
];
