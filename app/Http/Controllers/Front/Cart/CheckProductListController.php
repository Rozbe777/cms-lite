<?php

namespace App\Http\Controllers\Front\Cart;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Product;
use Illuminate\Http\Request;

class CheckProductListController extends Controller
{
    use ResponseTrait;

    function blade(Request $request)
    {
        if (!empty($request->input('id'))) {
            $ids = (explode(',', $request->input('id')));
            $attributes = Attribute::whereIn('product_id',$ids)->with('product')->with('typeFeatures')->get();
            return frontView('checkout.index',compact('attributes'));
        }
        return $this->message(__('message.content.search.notSuccess'))->error();
    }

    public function getBySlug(Request $request)
    {
        if (!empty($request->input('slug'))) {
            $products = Product::whereSlug($request->input('slug'))->active()->firstOrFail();
            $attributes = Attribute::whereProductId($products->id)->with('product')->with('typeFeatures')->get();
            return frontView('checkout.index',compact('attributes'));
        }
        return $this->message(__('message.content.search.notSuccess'))->error();
    }

    public function show(Request $request)
    {
        if (!empty($request->input('id'))) {
            $ids = (explode(',', $request->input('id')));
            $attributes = Attribute::whereIn('product_id',$ids)->with('product')->with('typeFeatures')->get();
            return $this->data($attributes)->message(__('message.success.200'))->success();
        }

        if (!empty($request->input('slug'))) {
            $products = Product::whereSlug($request->input('slug'))->active()->firstOrFail();
            $attributes = Attribute::whereProductId($products->id)->with('product')->with('typeFeatures')->get();
            return $this->message(__('message.success.200'))->data($attributes)->success();
        }
    }
}
