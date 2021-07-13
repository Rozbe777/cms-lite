<?php


namespace App\Http\Controllers\Front\Shop;


use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ResponseTrait;

    function show($slug)
    {
            $product = Product::whereSlug($slug)->active()->firstOrFail();
            $title = $product->title;
            $attributes = Attribute::whereProductId($product->id)->with('product')->with('typeFeatures')->get();
            return page('shop.product.index', compact('product', 'attributes', 'title'));
    }
}
