<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::factory()->times(3)->create();

        foreach (range(1,10) as $index){
            DB::table('content_tag')->insert([
               'content_id'=>$index,
               'tag_id'=>rand(1,3),
            ]);
        }
    }
}
