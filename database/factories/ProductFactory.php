<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'slug' => $this->faker->slug,
            'content' => $this->faker->text,
            'status' => $this->faker->randomElement(["active","deactivate"]),
            'entity' => $this->faker->randomElement(["available","unavailable"]),
            'user_id' => rand(1,4),
        ];
    }
}
