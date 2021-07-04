<?php

namespace Database\Seeders;

use App\Models\Bank;
use Illuminate\Database\Seeder;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        Bank::factory()->times(1)->create();

        $banks =
            [
                'zarinpall' =>
                    [
                        'class' => 'Zarinpal',
                        'payload' => json_encode(['request_url' => "https://{url}.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", 'pay_url' => "https://{url}.zarinpal.com/pg/StartPay/", 'verify_url' => 'https://{url}.zarinpal.com/pg/rest/WebGate/PaymentVerification.json']),
                        'name' => 'زرین پال',
                        'status' => 'sandbox',
                    ],
                'nextpay' =>
                    [
                        'class' => 'Nextpay',
                        'payload' => json_encode(['request_url' => "https://nextpay.org/nx/gateway/token", 'pay_url' => "https://nextpay.org/nx/gateway/payment/", 'verify_url' => 'https://nextpay.org/nx/gateway/verify']),
                        'name' => 'نکست پی',
                        'status' => 'disable',
                    ]
            ];

        foreach ($banks as $bank){
            Bank::create($bank);
        }
    }
}
