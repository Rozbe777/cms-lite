<?php

return [
    'role_structure' => [
        'admin' => [
            'admin.user' => 'export,i,c,s,e,u,des,search',
            'admin.role' => 'i,c,s,e,u,des'

        ],
        'user' => [

        ],
    ],
    'user_roles' => [
        'admin' => [
            ['name' => "Admin", "email" => "admin@gmail.com", "password" => '123456',"phone"=>'09120000000'],
        ],
        'user' => [
            ['name' => "firstUser", "email" => "user@gmail.com", "password" => '123456',"phone"=>'09110000000'],
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
        'r' => 'read',
        'sh' => 'show',

        'export' => 'export',
        'search' => 'search',

    ],
];
