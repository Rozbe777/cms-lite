<?php

namespace Database\Factories;

use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class PageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Page::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "title"=>$this->faker->title,
            "slug"=>$this->faker->slug,
            "content"=>$this->faker->text,
            "user_id"=>rand(1,18),
            'published_at'=>Carbon::now()
        ];
    }
}
