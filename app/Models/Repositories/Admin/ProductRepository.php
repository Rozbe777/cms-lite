<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Product\Traits\ProductTrait;
use App\Models\Category;
use App\Models\Product;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;

class ProductRepository implements RepositoryInterface
{
    use ProductTrait;

    public function all($status = null, $search = null, $entity = null, $categories = null, $sort = null, $discount = null)
    {
        if (empty($sort))
            $sort = 'id';

        if (!empty($categories))
            $categories = array_map('intval', $categories);

        return Product::when(!empty($search), function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('slug', 'like', '%' . $search . '%')
                    ->orWhere('content', 'like', '%' . $search . '%');
            });
        })->when(!empty($status), function ($query) use ($status) {
            $query->where('status', $status);
        })->with('attributes', function ($q) {
                $q->with('typeFeatures')->with('types');
            })
            ->when(!empty($categories), function ($query) use ($categories) {
                $query->with(['categories' => function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                }])->has('categories');
            })->when(empty($categories), function ($query) {
                $query->with('categories');
            })->when(!empty($entity), function ($query) use ($entity) {
                $query->where('entity', $entity);
            })->join('attributes', 'attributes.product_id', '=', 'products.id')
            ->when(!empty($discount), function ($query) use ($discount) {
                $query->where('attributes.discount_status', '=', $discount);
            })->with('user')->with('viewCounts')->orderBy('attributes.' . $sort, "DESC")->paginate(config('view.pagination'));
    }

    public function get($product)
    {
        $instance = $product->viewCounts;
        $instance->view_count++;
        $instance->save();
    }

    /**
     * @param $product
     * @return mixed
     */
    public function delete($product)
    {
        $product->update(['status' => 'deactivate']);
        return $product->delete();
    }

    /**
     * @param array $data
     * @param $product
     * @return mixed
     */
    public function update(array $data, $product)
    {
        unset($data['_token']);

        if (!empty($data['slug']))
            $data['slug'] = $this->slugHandler($data['slug']);

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $categoryIds = $data['categoryIds'] ?? null;
        unset($data["categoryIds"]);

        $features = $data['features'] ?? null;
        unset($data['features']);

        $attributes = $data['attributes'] ?? null;
        unset($data['attributes']);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        if (!empty($attributes))
            $att = $this->attributeUpdateHandler($attributes, $product->id);

        if (!empty($features))
            $this->featureUpdateHandler($features, $att->id);

        /** modify tag relations in database tables */
        if (!empty($tag_list))
            $this->tagHandler($tag_list, $product);

        /** modify category relations in database tables */
        if (!empty($categoryIds))
            $this->categoryHandler($categoryIds, $product);

        $product->update($data);

        $product->entity = ($product->attributes->count == 0) ? "unavailable" : "available";
        $product->save();
        return $product;
    }

    public function create(array $data)
    {
        unset($data['_token']);
        $data['slug'] = $this->slugHandler($data['slug']);

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $categoryIds = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $features = $data['features'] ?? null;
        unset($data['features']);

        $attributes = $data['attributes'] ?? null;
        unset($data['attributes']);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        $product = Product::create($data);

        if (!empty($attributes))
            $att = $this->attributeHandler($attributes, $product->id);

        if (!empty($features))
            $this->featureHandler($features);

        $product->viewCounts()->create();

        if (!empty($tag_list)) {
            foreach ($tag_list as $tag) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tag],
                    ['user_id' => Auth::id()]
                );
                $product->tags()->syncWithoutDetaching($tag);
            }
        }

        if (!empty($categoryIds)) {
            foreach ($categoryIds as $category) {
                $category = Category::findOrFail((int)$category);
                $product->categories()->syncWithoutDetaching($category);
            }
        }

        return $product;
    }

    public function multipleDestroy($data)
    {
        return Product::whereIn('id', $data['productIds'])->delete();
    }
}
