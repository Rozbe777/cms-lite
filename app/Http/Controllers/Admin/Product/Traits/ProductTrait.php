<?php


namespace App\Http\Controllers\Admin\Product\Traits;


use App\Models\Attribute;
use App\Models\Product;
use App\Models\Type;
use App\Models\TypeـFeature;
use Illuminate\Support\Facades\Auth;

trait ProductTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('images', $imageName);
    }

    public function slugHandler($slug)
    {
        if (Product::where('slug', '=', $slug)->exists()) {
            $i = 1;
            do {
                $item = $slug . '_' . $i++;
            } while ((Product::where('slug', "=", $item)->count()) != 0);
            return $item;
        } else {
            return $slug;
        }
    }

    public function featureHandler($features)
    {
        foreach ($features as $feature) {
            $data = Type::firstOrCreate(
                ['name' => $feature['name']],
                ['type' => $feature['type']]
            );

            $item = TypeـFeature::updateOrCreate(
//                [ "type_id" =>  ]
            );
        }
    }

    public function attributeHandler()
    {

    }
}
