<?php

namespace Database\Seeders;

use App\Models\OrderProducts;
use Illuminate\Database\Seeder;

class OrderProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderProducts::factory()->times(20)->create();
    }
}
