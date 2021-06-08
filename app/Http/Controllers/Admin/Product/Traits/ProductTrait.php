<?php


namespace App\Http\Controllers\Admin\Product\Traits;


use App\Models\Attribute;
use App\Models\Product;
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
        $attributes = [];

        foreach ($features as $feature) {
            $attributes[] = Attribute::firstOrCreate(
                ['name' => $feature['name']],
                ['user_id' => Auth::id(),
                    'type' => $feature['type']
                ]
            );
            return $attributes;
        }
    }
}
