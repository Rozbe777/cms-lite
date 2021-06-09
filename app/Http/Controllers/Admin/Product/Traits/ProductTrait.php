<?php


namespace App\Http\Controllers\Admin\Product\Traits;


use App\Models\Attribute;
use App\Models\Product;
use App\Models\Type;
use App\Models\TypeFeature;

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

    public function attributeHandler($attribute,$p_id)
    {
        $data = Attribute::updateOrCreate(
            [ "product_id" => $p_id , "product_code" => $attribute['product_code']],
            [ "price" => $attribute['price'], "count" => $attribute['count'], "limit" => $attribute['limit']]
        );

        return $data;
    }

    public function featureHandler($features, $attr_id)
    {

            $data = Type::firstOrCreate(
                ['name' => $features['name'], "attribute_id" => $attr_id]
            );

            $feature = TypeFeature::firstOrCreate(
                [ "type_id" => $data->id, "attribute_id" => $attr_id,"title" => $features['title'] , "value" => $features['value']],

            );

    }

    public function featureUpdateHandler($features, $attr_id)
    {

        $data = Type::firstOrCreate(
            ['name' => $features['name'], "attribute_id" => $attr_id]
        );

        $feature = TypeFeature::firstOrCreate(
            [ "type_id" => $data->id, "attribute_id" => $attr_id,"title" => $features['title'] , "value" => $features['value']],

        );

    }

    public function tagHandler($tag_list)
    {

    }

    public function categoryHandler($category_list)
    {

    }

}
