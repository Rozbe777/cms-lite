<?php

namespace Database\Factories;

use App\Models\GatewayesInfo;
use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class GatewayesInfoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = GatewayesInfo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'   => rand(1,3),
            'user_name' => $this->faker->name,
            'bank'      => 'zarinpal'//$this->faker->randomElement(['zarinpal','mellat','parsian']),
        ];
    }
}
