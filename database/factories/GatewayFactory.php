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
            'status' => 'disable',
            'class'      => $this->faker->randomElement(['Zarinpal','Mellat','Parsian']),
            'bank_id'      => rand(1,3)//$this->faker->randomElement(['zarinpal','mellat','parsian']),
        ];
    }
}
