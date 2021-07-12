<?php


namespace App\Http\Controllers\Front\Shop;


use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Product;

class ProductController extends Controller
{

    function show($slug)
    {
        $product = Product::whereSlug($slug)->active()->firstOrFail();
        $title = $product->title;
        $attributes = Attribute::whereProductId($product->id)->with('typeFeatures')->get();

        return page('shop.product.index', compact('product', 'attributes', 'title'));
    }

}
