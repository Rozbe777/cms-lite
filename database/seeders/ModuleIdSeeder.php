<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleIdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Module::create([
            'name' => 'blog',
            'status' => 'active',
        ]);

        Module::create([
            'name' => 'store',
            'status' => 'active',
        ]);

    }
}
