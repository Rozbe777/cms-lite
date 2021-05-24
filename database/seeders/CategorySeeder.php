<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()->times(3)->create();

        foreach (range(1,10) as $index){
            DB::table('category_content')->insert([
                'content_id'=>$index,
                'category_id'=>rand(1,3),
            ]);
        }

        foreach (range(1,10) as $index) {
            DB::table('view_counts')->insert([
                'viewcountable_type' => 'App\Models\Category',
                'viewcountable_id' => $index,
                'view_count' => 1
            ]);
        }
    }
}
