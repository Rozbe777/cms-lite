<?php
/**
 * Created by PhpStorm.
 * User: mohsen1
 * Date: 10/18/18
 * Time: 10:06 PM
 */

return
    [
        'default_type' => 'online',
        'type' => [
            'online' => [
                'default_gateway' => 'zarinpal',
                'default_min_amount' => '1000',
                'gateways' => [
                    'zarinpal' => [
                        'id' => 1,
                        'name' => 'زرین پال',
                        'status' => 'enable',//enable or disable
                        'type' => 'online', //online or sms
                        'logo' => 0,//logo file id
                        'request_url' => 'https://www.zarinpal.com/pg/services/WebGate/wsdl',
                        'pay_url' => 'https://www.zarinpal.com/pg/StartPay',
                        'verification_url' => 'https://www.zarinpal.com/pg/services/WebGate/wsdl',
                        'merchant_id' => "00000000-0000-0000-0000-000000000000",
                        'class' => \App\Classes\Payment\Provider\Online\Gateway\Zarinpal\Zarinpal::class,
                    ],
                ],
            ],
        ],

//            'parsian' => [
//                'id' => 2,
//                'name' => 'پارسیان',
//                'status' => 'enable',//enable or disable
//                'type' => 'online', //online or sms
//                'logo' => 0,//logo file id
//                'request_url' => 'https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx?wsdl',
//                'pay_url' => 'https://pec.shaparak.ir/NewIPG',
//                'verification_url' => 'https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx?WSDL',
//                'merchant_id' => '1212121212',
//                'class' => Limito\Pay\Payment\Bank\Banks\Parsian::class
//            ],
//            'mellat' => [
//                'id' => 3,
//                "username" => "SAMPLE1212",
//                "password" => 23121233,
//                'name' => 'ملت',
//                'status' => 'enable',//enable or disable
//                'type' => 'online', //online or sms
//                'logo' => 0,//logo file id
//                'request_url' => 'https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl',
//                'pay_url' => 'https://bpm.shaparak.ir/pgwchannel/payment.mellat',
//                'verification_url' => 'https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl',
//                'merchant_id' => '121212121212',
//                'class' => Limito\Pay\Payment\Bank\Banks\Mellat::class
//            ],
//            'payping' => [
//                'id' => 4,
//                'name' => 'پی پینگ',
//                'status' => 'enable',//enable or disable
//                'type' => 'online', //online or sms
//                'logo' => 0,//logo file id
//                'request_url' => 'https://api.payping.ir/v1/',
//                'pay_url' => 'https://api.payping.ir/v1/',
//                'verification_url' => 'https://api.payping.ir/v1/',
//                'merchant_id' => '121212121212',
//                'class' => Limito\Pay\Payment\Bank\Banks\Payping::class
//            ]
//    ]
    ];
