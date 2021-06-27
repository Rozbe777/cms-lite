<?php

namespace Database\Seeders;

use App\Models\TransactionType;
use Illuminate\Database\Seeder;

class TransactionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [
            ['name' => 'پرداخت آنلاین', 'disposable' => 1],
            ['name' => 'پرداخت هزینه سبد خرید', 'disposable' => 0],
        ];
        foreach ($types as $type) {
            $model = new TransactionType();
            $model->name = $type['name'];
            $model->disposable = $type['disposable'];
            $model->save();
        }
    }
}
