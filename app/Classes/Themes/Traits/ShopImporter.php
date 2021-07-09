<?php


namespace App\Classes\Themes\Traits;


use App\Http\Controllers\Admin\Product\Traits\ProductTrait;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\TypeFeature;

trait ShopImporter
{

    function createProduct($products)
    {
        foreach ($products as $product) {
            $p = new Product();
            $p->title = $product['title'];
            $p->slug = str_replace(' ', '-', $product['title']);
            $p->content = $product['content'];
            $p->image = $product['image'];
            $p->user_id = $product['user_id'];
            $p->save();
            if (!empty($product['attributes'])) {
                $this->createAttribute($product['attributes'], $p->id);
            }
        }
    }

    function createAttribute($attributes, $productId)
    {
        foreach ($attributes as $attribute) {
            $a = new Attribute();
            $a->product_id = $productId;
            $a->product_code = $attribute['product_code'];
            $a->price = $attribute['price'];
            $a->discount = $attribute['discount'];
            $a->save();
            if (!empty($attribute['features'])) {
                $this->createFeature($attribute['features'], $a->id);
            }

        }
    }

    function createFeature($features, $attributeId)
    {
        foreach ($features as $index => $feature) {
            $f = new TypeFeature();
            $f->type_id = ($index == 0) ? 1 : 2;
            $f->attribute_id = $attributeId;
            $f->title = $feature['title'];
            $f->attribute_id = $feature['value'];
            $f->save();
        }
    }
}
