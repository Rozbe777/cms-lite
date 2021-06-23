<?php


namespace App\Http\Controllers\Admin\Category\Traits;


use App\Helpers\FileManager\FileManager;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;


trait CategoryTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('public/images', $imageName);
    }

    public function slugHandler($slug)
    {
        if (Category::where('slug', '=', $slug)->exists()) {
            $i = 0;
            do {
                $item = $slug . '_' . $i++;
            } while ((Category::where('slug', "=", $item)->count()) != 0);
            return $item;

        } else {
            return $slug;
        }
    }

    public function parentHandler($item)
    {
        if (is_array($item->all())){
            foreach ($item->all()['categoryIds'] as $parent_id){
                $parent = Category::where('id',$parent_id)->get();
                $parent= $parent[0];
                $children = Category::where('parent_id', $parent_id)->get();
                $children->transform(function ($index, $key) use ($parent) {
                    $index->parent_id = $parent->parent_id;
                    $index->save();
                    return $index;
                });
            }
        }

        $children = Category::where('parent_id', $item->id)->get();
        $children->transform(function ($index, $key) use ($item) {
            $index->parent_id = $item->parent_id;
            $index->save();
            return $index;
        });
    }

    public function listHandler()
    {
        $categories = Category::whereParentId(0)
            ->with('contents')->get();
        foreach ($categories as $category) {
            $category->childern = $this->getChildrenCategories($category->id);
        }
        return $categories;
    }

    function getChildrenCategories($categoryId)
    {
        $categories = Category::whereParentId($categoryId)->get();
        foreach ($categories as $category) {
            $category->children = $this->getChildrenCategories($category->id);
        }
        return $categories;
    }
}
