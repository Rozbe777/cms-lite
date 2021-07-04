<?php

namespace Database\Factories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Invoice::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->domainName,
            'gateway_id' => rand(1,2),
            'user_id' => rand(1,10),
            'callback_url' => '127.0.0.1:8000/test2',
            'description' => $this->faker->sentence,
            'amount' => rand(10000,50000),
            'status' => $this->faker->randomElement(['paid', 'unpaid', 'fail']),
            'order_id' => rand(1,5),
        ];
    }
}
