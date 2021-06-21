<?php

namespace Database\Seeders;

use App\Models\GatewayesInfo;
use Illuminate\Database\Seeder;

class GatewayeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GatewayesInfo::factory()->times(10)->create();
    }
}
