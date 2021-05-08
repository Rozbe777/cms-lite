<?php

namespace Database\Factories;

use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Content::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "owner"=>$this->faker->randomElement(["page", "content"]),
            "title"=>$this->faker->title,
            "slug"=>$this->faker->slug,
            "content"=>$this->faker->text,
            "user_id"=>$this->faker->randomDigit,
            'published_at'=>Carbon::now()
        ];
    }
}
