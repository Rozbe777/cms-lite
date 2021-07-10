<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Address::create([
            'user_id' => 1,
            'state' => 'تهران',
            'city' => 'تهران',
            'address' => 'میدان انقلاب'
        ]);
        Address::create([
            'user_id' => 2,
            'state' => 'فارس',
            'city' => 'شیراز',
            'address' => 'فلکه گاز'
        ]);
        Address::create([
            'user_id' => 3,
            'state' => 'اصفهان',
            'city' => 'اصفهان',
            'address' => 'چارباغ'
        ]);
    }
}
