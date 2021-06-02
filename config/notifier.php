<?php
return [
    'default_provider' => 'sms',
    'providers' => [
        'sms' => [
            'default_gateway' => 'kavenegar',
            'gateway' => [
                ['kavenegar' =>
                    [
                        'username' => '',
                        'password' => '',
                        'from' => '',
                        'url' => '',
                        'class'=>''
                    ]
                ]
            ]
        ]
    ]
];
