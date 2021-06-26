<?php
return [
    'default_provider' => 'sms',
    'developers' => ['9120053069', '9124702987'],
    'developer_code' => 8585,
    'providers' => [
        'sms' => [
            'default_gateway' => 'kavenegar',
            'gateway' => [
                'kavenegar' =>
                    [
                        'username' => '73564D322B6A583256562F38672F7877694B7745454232694C55415A6B36644F412B4B6B7259583055474D3D',
                        'password' => '',
                        'from' => '10004346',
                        'url' => '',
                        'body' => 'verify',
                        'class' => App\Classes\Notifier\Provider\Sms\Gateway\KavenegarCenter::class
                    ]
            ]
        ]
    ]
];
