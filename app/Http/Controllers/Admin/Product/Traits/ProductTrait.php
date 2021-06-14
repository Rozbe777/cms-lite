<?php


namespace App\Http\Controllers\Admin\Product\Traits;


use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use App\Models\Type;
use App\Models\TypeFeature;
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

    public function attributeHandler($attributes, $p_id)
    {
        foreach ($attributes as $attribute) {
            $count = !empty($attribute['count']) ? (int)$attribute['count'] : ($attribute['count'] == 0 ? 0 : null); //null is unlimited
            $limit = !empty($attribute['limit']) ? (int)$attribute['limit'] : null;
            $discount = (!empty($attribute['discount'])) ? $attribute['discount'] != 0 ? (int)$attribute['discount'] : 0 : 0;
            $discount_status = (!empty($discount)) ? "active" : "deactivate";

            return Attribute::updateOrCreate(
                ["product_id" => $p_id, "product_code" => $attribute['product_code']],
                ["price" => $attribute['price'], "count" => $count, "limit" => $limit, "discount" => $discount, "discount_status" => $discount_status]
            );
        }
    }

    public function featureHandler($features, $attr_id)
    {
        foreach ($features as $item) {
            $data = Type::firstOrCreate(
                ['name' => $item['name'], "attribute_id" => $attr_id]
            );

            $title = !empty($item['title']) ? $item['title'] : null;
            $value = !empty($item['value']) ? $item['value'] : null;
            $color = ($title == "رنگ") ? $item['color'] : null;

            $feature = TypeFeature::firstOrCreate(
                ["type_id" => $data->id, "attribute_id" => $attr_id, "title" => $title, "color" => $color, "value" => $value],
            );
        }
    }

    public function attributeUpdateHandler($attribute, $p_id)
    {
        $data = Attribute::where(['product_id' => $p_id, 'product_code' => $attribute['product_code']])->firstOrFail();

        $data->price = !empty($attribute['price']) ? (int)$attribute['price'] : $data->price;
        $data->count = !empty($attribute['count']) ? (int)$attribute['count'] : ((array_key_exists('count', $attribute) && $attribute['count'] == 0) ? 0 : $data->count);
        $data->limit = !empty($attribute['limit']) ? (int)$attribute['limit'] : $data->limit;

        if (!empty($attribute['discount'])) {
            $data->discount = (int)$attribute['discount'];
            $data->discount_status = 'active';
        } else {
            $data->discount = 0;
            $data->discount_status = 'deactivate';

            $data->save();
        }
        $data->save();
        return $data;
    }


    public function featureUpdateHandler($features, $attr_id)
    {
        $data = Type::firstOrCreate(
            ['name' => $features['name'], "attribute_id" => $attr_id]
        );

        $feature = TypeFeature::firstOrCreate(
            ["type_id" => $data->id, "attribute_id" => $attr_id]
        );

        $feature->title = !empty($features['title']) ? $features['title'] : $feature->title;
        $feature->value = !empty($features['value']) ? $features['value'] : $feature->value;
        $feature->color = !empty($features['color']) ? $features['color'] : $feature->color;
        $feature->save();

        return $feature;
    }

    public function tagHandler($tag_list, $product)
    {
        foreach ($tag_list as $tag) {
            $tag = Tag::firstOrCreate(
                ['name' => $tag],
                ['user_id' => Auth::id()]
            );
            if (!$product->tags->contains($tag->id))
                $product->tags()->attach($tag->id);
        }
    }

    public function categoryHandler($categoryIds, $product)
    {
        foreach ($categoryIds as $category) {
            $category = Category::findOrFail((int)$category);
            $product->categories()->attach($category);
        }
    }

}
