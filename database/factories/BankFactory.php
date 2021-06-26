<?php

namespace Database\Factories;

use App\Models\Bank;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Bank::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'class' => $this->faker->randomElement(['Zarinpal'/*, 'Mellat', 'Parsian'*/]),
            'payload' => json_encode(['request_url' => "https://{url}.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", 'pay_url' => "https://{url}.zarinpal.com/pg/StartPay/", 'verify_url' => 'https://{url}.zarinpal.com/pg/rest/WebGate/PaymentVerification.json']),
            'name' => 'زرین پال',
            'status' => 'sandbox'
        ];
    }
}
