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
        Category::create([
            'name'=>'بدون دسته بندی',
            'slug'=> 'بدون دسته بندی',
            'user_id'=>1,
            'status'=>'active',
            'module_id' => 1,
        ]);

        Category::create([
            'name'=>'بدون دسته بندی',
            'slug'=> 'بدون دسته بندی',
            'user_id'=>1,
            'status'=>'active',
            'module_id' => 2,
        ]);
    }
}
