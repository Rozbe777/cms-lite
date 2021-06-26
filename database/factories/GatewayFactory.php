<?php

namespace Database\Factories;

use App\Models\Gateway;

use Illuminate\Database\Eloquent\Factories\Factory;

class GatewayFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Gateway::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'status' => 'sandbox',
            'bank_id' => 1/* rand(1/*, 3)*///$this->faker->randomElement(['zarinpal','mellat','parsian']),
        ];
    }
}
