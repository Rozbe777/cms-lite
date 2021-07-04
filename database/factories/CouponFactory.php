<?php

namespace Database\Factories;

use App\Models\Coupon;
use Illuminate\Database\Eloquent\Factories\Factory;

class CouponFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Coupon::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $type = $this->faker->randomElement(['fixed_price','percentage','free_delivery']);
        $user_id = rand(1,5);

        return [
            'code' => rand(111111, 999999),
            'user_id' => $user_id,
            'status' => $this->faker->randomElement(['active', 'deactivate']),
            'type' => $type,
            'value' => $type == 'fixed_price' ? 10000 : ('percentage' ? 20 : null),
            'max_limit' => 100000,
        ];
    }
}
