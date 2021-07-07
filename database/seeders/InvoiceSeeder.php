<?php

namespace Database\Seeders;

use App\Models\Invoice;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Invoice::factory()->times(5)->create();

        for($i = 0 ; $i<5 ;$i++){
            DB::table('invoice_products')->insert([
                'invoice_id' => $i+1,
                'product_id' => rand(7,10)
            ]);
            DB::table('invoice_products')->insert([
                'invoice_id' => $i+1,
                'product_id' => rand(1,4)
            ]);
            DB::table('invoice_products')->insert([
                'invoice_id' => $i+1,
                'product_id' => rand(4,7)
            ]);

        }
    }
}
