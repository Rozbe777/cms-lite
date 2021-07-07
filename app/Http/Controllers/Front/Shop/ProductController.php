<?php


namespace App\Http\Controllers\Front\Shop;


use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{

    function show($slug)
    {
        $product = Product::whereSlug($slug)->active()->firstOrFail();

        return page('shop.product.index', compact('product'));
    }

}