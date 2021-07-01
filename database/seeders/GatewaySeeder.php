<?php

namespace Database\Seeders;

use App\Models\Bank;
use App\Models\Gateway;

use Illuminate\Database\Seeder;

class GatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        Gateway::factory()->times(1)->create();

        $gateways =
            [
                'zarinpall' =>
                    [
                        'display_name' => 'زرین پال',
                        'bank_id' => 1,
                        'is_default' => 1,
                        'status' => 'sandbox',
                        'merchant_id' => '00000000-0000-0000-0000-000000000000',
                    ],
                'nextpay' =>
                    [
                        'display_name' => 'نکست پی',
                        'bank_id' => 2,
                        'is_default' => 0,
                        'status' => 'disable',
                        'merchant_id' => 'ad357e30-07f0-4919-a864-61dd39b02c7d',
                    ]
            ];

        foreach ($gateways as $gateway){
            Gateway::create($gateway);
        }
    }
}
