<?php

namespace Database\Factories;

use App\Models\CouponSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

class CouponSettingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CouponSetting::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
            $cart_conditions = $this->faker->randomElement(['unlimited', 'min_price', 'min_purchase_number', 'max_cart_price', 'max_purchase_number']);
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

            return [
                'functionality' => $this->faker->randomElement(['total_items_price', 'total_cart_price', 'special_products', 'special_categories']),
                'coupon_id' => $i,
                'cart_conditions' => $cart_conditions,
                'cart_conditions_amount' => $cart_conditions_amount,
                'user_status' => $this->faker->randomElement(['all', 'special_users', 'group_of_users']),
                'user_group' => $this->faker->randomElement([-1, -2, -3, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                'number_of_times_allowed_to_use' => 3,
                'number_of_use_allowed_per_user' => 1,
                'start_date' => now(),
                'end_date' => null,
            ];
        }
}
