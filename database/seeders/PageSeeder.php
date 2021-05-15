<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Page::factory()->times(10)->create();

        foreach (range(1, 10) as $index) {
            DB::table('page_tag')->insert([
                'page_id' => $index,
                'tag_id' => rand(1, 3),
            ]);
        }

        foreach (range(1, 10) as $index) {
            DB::table('category_page')->insert([
                'page_id' => $index,
                'category_id' => rand(1, 3),
            ]);
        }

        foreach (range(1,10) as $index) {
            DB::table('view_counts')->insert([
                'viewcountable_type' => 'App\Models\Page',
                'viewcountable_id' => $index,
                'view_count' => 1
            ]);
        }
    }
}
