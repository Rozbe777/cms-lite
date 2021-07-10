<?php

namespace Database\Seeders;

use App\Models\Transfer;
use Illuminate\Database\Seeder;

class TransferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Transfer::create([
            'title' => 'پیشتاز',
            'price' => '50000',
        ]);

        Transfer::create([
            'title' => 'معمولی',
            'price' => '25000',
        ]);
    }
}
