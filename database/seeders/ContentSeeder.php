<?php

namespace Database\Seeders;

use App\Models\Content;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Content::factory()->times(10)->create();

        foreach (range(1,10) as $index) {
            DB::table('view_counts')->insert([
                'viewcountable_type' => 'App\Models\Content',
                'viewcountable_id' => $index,
                'view_count' => 1
            ]);
        }
    }

}
