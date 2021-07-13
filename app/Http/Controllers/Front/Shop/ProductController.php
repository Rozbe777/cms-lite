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
    function blade(Request $request)
    {
        if (!empty($request->input('id'))) {
            $ids = (explode(',', $request->input('id')));
            $products = Product::whereIn('id', $ids)->active()->get();
            return frontView('checkout.index',compact('products'));
        }
        return $this->message(__('message.content.search.notSuccess'))->error();
    }

    public function getBySlug(Request $request)
    {
        if (!empty($request->input('slug'))) {
            $product = Product::whereSlug($request->input('slug'))->active()->firstOrFail();
            $title = $product->title;
            $attributes = Attribute::whereProductId($product->id)->with('typeFeatures')->get();
            return page('shop.product.index', compact('product', 'attributes', 'title'));
        }
        return $this->message(__('message.content.search.notSuccess'))->error();
    }

    public function show(Request $request)
    {
        if (!empty($request->input('id'))) {
            $ids = (explode(',', $request->input('id')));
            $products = Product::whereIn('id', $ids)->active()->get();
            return $this->data($products)->message(__('message.success.200'))->success();
        }

        if (!empty($request->input('slug'))) {
            $products = Product::whereSlug($request->input('slug'))->active()->firstOrFail();
            $attributes = Attribute::whereProductId($products->id)->with('product')->with('typeFeatures')->get();
            return $this->message(__('message.success.200'))->data($attributes)->success();
        }
    }
}
