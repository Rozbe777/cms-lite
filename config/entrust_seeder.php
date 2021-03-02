<?php

return [
    'role_structure' => [
        'admin' => [
            'admin.user' => [
                'display_name'=>'کاربران(بخش ادمین)',
                'access'=>'export,i,c,s,e,u,des,search,multides'
            ],
            'admin.role' =>[
                'display_name'=>'دسترسی(بخش ادمین)',
                'access'=>'i,c,s,e,u,des'
            ],

        ],
        'user' => [

        ],
    ],
    'user_roles' => [
        'admin' => [
            ['name' => "Admin", "email" => "admin@gmail.com", "password" => '123456',"phone"=>'09120000000'],
        ],
        'user' => [
            ['name' => "firstUser", "email" => "user1@gmail.com", "password" => '123456',"phone"=>'09110000000'],
            ['name' => "firstUser", "email" => "user2@gmail.com", "password" => '123456',"phone"=>'09110000001'],
            ['name' => "firstUser", "email" => "user3@gmail.com", "password" => '123456',"phone"=>'09110000002'],
            ['name' => "firstUser", "email" => "user4@gmail.com", "password" => '123456',"phone"=>'09110000030'],
            ['name' => "firstUser", "email" => "user5@gmail.com", "password" => '123456',"phone"=>'09110000050'],
            ['name' => "firstUser", "email" => "user6@gmail.com", "password" => '123456',"phone"=>'09110000060'],
            ['name' => "firstUser", "email" => "user7@gmail.com", "password" => '123456',"phone"=>'09110000100'],
            ['name' => "firstUser", "email" => "user8@gmail.com", "password" => '123456',"phone"=>'09110000004'],
            ['name' => "firstUser", "email" => "user9@gmail.com", "password" => '123456',"phone"=>'09110000005'],
            ['name' => "firstUser", "email" => "user10@gmail.com", "password" => '123456',"phone"=>'09118000080'],
            ['name' => "firstUser", "email" => "user11@gmail.com", "password" => '123456',"phone"=>'09117000010'],
            ['name' => "firstUser", "email" => "user13@gmail.com", "password" => '123456',"phone"=>'09116000009'],
            ['name' => "firstUser", "email" => "user14@gmail.com", "password" => '123456',"phone"=>'09115000009'],
            ['name' => "firstUser", "email" => "user15@gmail.com", "password" => '123456',"phone"=>'09114000009'],
            ['name' => "firstUser", "email" => "user16@gmail.com", "password" => '123456',"phone"=>'09113000009'],
            ['name' => "firstUser", "email" => "user17@gmail.com", "password" => '123456',"phone"=>'09112000009'],
            ['name' => "firstUser", "email" => "user18@gmail.com", "password" => '123456',"phone"=>'09111000009'],


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
        'multides'=>'multipleDestroy',
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
        'admin' => 'ادمین',


    ],
];
