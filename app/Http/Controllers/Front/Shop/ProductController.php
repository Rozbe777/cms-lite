<?php


namespace App\Http\Controllers\Front\Shop;


use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Front\SearchIdRequest;
use App\Http\Requests\SearchRequest;
use App\Models\Attribute;
use App\Models\Category;
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

    function getAll(SearchIdRequest $request)
    {
        $categories = (!isset($request->id) || (array_sum(array_values($request->id)) == null)) ?
            Category::where('module_id', 1)->with('products')->get() :
            Category::where('module_id', 1)->whereIn('id', $request->id)->with('products')->get();

        return $this->data($categories)->success();
    }

    function getProduct(SearchIdRequest $request)
    {
        $products = (!isset($request->id) || (array_sum(array_values($request->id)) == null)) ?
            Product::with('categories')->get() :
            Product::whereIn('id', $request->id)->with('categories')->get();

        foreach ($products as $product) {
            $categories = $product->categories;
            foreach ($categories as $category) {
                $categories_id[] = $category->id;
            }
        }
        $products = [
            'products' => $products,
            'related_products' => Product::whereNotIn('id', $request->id)->whereHas('categories', function ($q) use ($categories_id) {
                $q->whereIn('categories.id', $categories_id);
            })->take(config('view.related_number'))->get(),
        ];

        return $this->data($products)->success();
    }

    public function search(SearchRequest $request)
    {
        $search = $request->slug;

        $products = Product::when(!empty($search),function ($query) use($search){
            $query->where('content', 'like', '%' . $search . '%');
        })->with('categories')->get();

        return $this->data($products)->success();
    }
}
