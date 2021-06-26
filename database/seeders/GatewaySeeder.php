<?php

namespace Database\Seeders;

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
        Gateway::factory()->times(1)->create();
    }
}
