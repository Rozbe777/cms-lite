<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Product\Traits\ProductTrait;
use App\Models\Category;
use App\Models\Product;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductRepository implements RepositoryInterface
{
    use ProductTrait;

    public function all($status = null, $search = null, $entity = null, $categories = null, $sort = null, $discount = null)
    {
        $time = null;

        $status = ($status == 'true') ? 'active' : null;

        $entity = ($entity == 'true') ? 'available' : null;

        $discount = ($discount == 'true') ? 'active' : null;

        $id = empty($sort) ? 'id' : null;

        if ($sort == 'created_at') {
            $time = 'created_at';
            $sort = null;
        }

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
        })->when(!empty($entity), function ($query) use ($entity) {
            $query->where('entity', $entity);
        })->with('attributes', function ($q) {
            $q->with('typeFeatures')->with('types');
        })
            ->when(!empty($categories), function ($query) use ($categories) {
                $query->whereHas('categories', function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                });
            })->when(empty($categories), function ($query) {
                $query->with('categories');
            })
            ->join('attributes', 'attributes.product_id', '=', 'products.id')
            ->selectRaw('
            products.*,max(attributes.price) as price,
            max(attributes.count) as count,
            max(attributes.discount_percentage) as discount'
            )
            ->groupby('attributes.product_id')
            ->when(!empty($discount), function ($query) use ($discount) {
                $query->whereHas('attributes', function ($query) use ($discount) {
                    $query->where('attributes.discount_status', $discount);
                });
            })
            ->with('user')
            ->with('viewCounts')
            ->with('tags')
            ->when(!empty($sort), function ($query) use ($sort) {
                $query->orderByDesc($sort)->groupBy('id')->get();
            })
            ->when(!empty($id), function ($query) {
                $query->orderByDesc('id');
            })
            ->when(!empty($time), function ($query) use ($time) {
                $query->latest();
            })
            ->paginate(config('view.pagination'));
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

        $data['slug'] = (!empty($data['slug'])) ? ($data['slug'] != $product->slug) ? $this->slugHandler($data['slug']) : $product->slug : $product->slug;

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $categoryIds = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $features = $data['features'] ?? null;
        unset($data['features']);

        $attributes = $data['attributes'] ?? null;
        unset($data['attributes']);

        $data['user_id'] = Auth::id();

        if (!empty($data['image']) && !is_string($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        elseif (is_string($data['image']) && $data['image'] == 'true')
            unset($data['image']);
        else
            $data['image'] = null;

        if (!empty($attributes))
            $att = $this->attributeUpdateHandler($attributes, $product->id);

        if (!empty($features))
            $this->featureUpdateHandler($features);

        /** modify tag relations in database tables */
        if (!empty($tag_list))
            $this->tagHandler($tag_list, $product);

        /** modify category relations in database tables */
        if (!empty($categoryIds))
            $this->categoryHandler($categoryIds, $product);

        $product->update($data);

        foreach ($product->attributes as $attribute) {
            $count[] = $attribute->count;
        }
        $product->entity = (array_sum($count) > 0) ? "unavailable" : "available";

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

        if (!empty($data['image']) && !is_string($data['image'])) {
            $data['image'] = $this->imageHandler($data['image']);
        } elseif (is_string($data['image']) && $data['image'] == 'true') {
            $path = (Product::find($data['id']))->image;
            $time = time();
            $newPath = substr_replace($path, $time, '14', 0);

            Storage::copy($path, $newPath);
            $data['image'] = $newPath;
        } else {
            $data['image'] = null;
        }

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
