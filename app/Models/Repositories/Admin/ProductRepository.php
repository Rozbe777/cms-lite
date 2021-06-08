<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Product\Traits\ProductTrait;
use App\Models\Product;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Illuminate\Support\Facades\Auth;

class ProductRepository implements RepositoryInterface
{
    use ProductTrait;

    public function all()
    {
        // TODO: Implement all() method.
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    public function update(array $data, $id)
    {
        // TODO: Implement update() method.
    }

    public function create(array $data)
    {
        $data['slug'] = $this->slugHandler($data['slug']);

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $category_list = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $features = $data['feature'] ?? null;
        unset($data['feature']);

        $attributes = $data['attributes'] ?? null;
        unset($data['attributes']);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        $product = Product::create($data);

        $features = $this->featureHandler($features);
        $attributes = $this->attributeHandler($attributes);

//        $attributes = $this->featureHandler($features);
//        foreach ($attributes as $attribute){
//            $product->attributes()->attach($attribute);
//        }

        $product->viewCounts()->create();

        foreach ($tag_list as $tag) {
            $tag = Tag::firstOrCreate(
                ['name' => $tag],
                ['user_id' => Auth::id()]
            );
            $product->tags()->attach($tag);
        }

        foreach ($category_list as $category) {
            $category = Category::findOrFail((int)$category);
            $product->categories()->sync($category);
        }

        return $product;
    }

    public function multipleDestroy($data)
    {
        return Product::whereIn('id',$data['productIds'])->delete();
    }
}
