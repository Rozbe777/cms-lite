<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\CouponSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

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
//        CouponSetting::factory()->times(10)->create();

        for($i=1;$i<11;$i++){
            $functionality = (Arr::random(['total_items_price', 'total_cart_price', 'special_products', 'special_categories'],1))[0];
            $user_status = (Arr::random(['all', 'special_users', 'group_of_users'],1))[0];
            $user_group = (Arr::random([-1, -2, -3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],1))[0];
            $cart_conditions = (Arr::random(['unlimited', 'min_price', 'min_purchase_number', 'max_cart_price', 'max_purchase_number'],1))[0];
            if ($cart_conditions == 'unlimited')
                $cart_conditions_amount = null;
            elseif ($cart_conditions == 'min_price')
                $cart_conditions_amount = 1000;
            elseif ($cart_conditions == 'min_purchase_number')
                $cart_conditions_amount = 2;
            elseif ($cart_conditions == 'max_cart_price')
                $cart_conditions_amount = 10000;
            elseif ($cart_conditions == 'max_purchase_number')
                $cart_conditions_amount = 10;
            else
                $cart_conditions_amount = null;

            DB::table('coupon_settings')->insert([
                'functionality' => $functionality,
                'coupon_id' => $i,
                'cart_conditions' => $cart_conditions,
                'cart_conditions_amount' => $cart_conditions_amount,
                'user_status' => $user_status,
                'user_group' => $user_group,
                'number_of_times_allowed_to_use' => 3,
                'number_of_use_allowed_per_user' => 1,
                'start_date' => null,
                'end_date' => null,
            ]);
        }

    }
}
