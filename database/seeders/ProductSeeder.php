<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\Product;
use App\Models\Type;
use App\Models\TypeFeature;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::factory()->times(10)->create();

        $name = ['color','size','gender'];
        $status = ["active", "deactivate"];

        for ($i = 1; $i<11 ; $i++){
            Attribute::create(
                [
                    'product_id' => $i,
                    'product_code' => rand(10000000,100000000),
                    'price' => rand(10000,100000),
                    'discount' => rand(100,500),
                    'discount_status' => $status[rand(0,1)],
                    'count' => rand(0,14),
                    'limit' => rand(0,2),
                ]);
        }

        for ($i = 0; $i<3 ; $i++) {
            Type::create(
                [
                   'name' => $name[$i],
                    'attribute_id' => rand(1,10),
                ]);
        }

        for ($i = 1; $i<11 ; $i++) {
            TypeFeature::create([
                'type_id' => rand(1,10),
                'attribute_id' => rand(1,10),
                'title' => Str::random(6),
                'value' => Str::random(6),
            ]);
        }




    }
}
