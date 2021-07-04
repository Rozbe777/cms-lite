<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_id = rand(1,5);
        return [
            'user_id' => $user_id,
            'status' => $this->faker->randomElement(['done','pending_pay','pending_operator','pending_delivery','process', 'rejected','failed']),
            'total_price' => rand(50000,100000),
            'coupon_id' => rand(1,10),
            'tax' => rand(1,10),
            'description' => rand(1,10),
            'transport_id' => rand(1,10),
            'address_id' => $user_id,
        ];
    }
}
