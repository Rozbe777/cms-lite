<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SettingSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ContentSeeder::class);
        $this->call(TagSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(PageSeeder::class);
        $this->call(ThemeSeeder::class);
        $this->call(ProductSeeder::class);
    }
}
