<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\CouponSetting;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Coupon::factory()->times(10)->create();
        CouponSetting::factory()->times(10)->create();
    }
}
