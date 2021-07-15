<?php


namespace App\Http\Controllers\Front\Shop;


use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Module;


class CategoryController extends Controller
{

    function show($slug = null)
    {
        $category = Category::active()->whereSlug($slug)->whereModuleId(Module::SHOP_MODULE_ID)->first();
        $title = $category->name;
        $products = $category->products()->orderByDesc('id')->paginate(config('view.pagination'));
        return page('shop.category', compact('category', 'products', 'title'));
    }
}
