<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Category\Traits\CategoryTrait;
use App\Models\Category;
use \App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CategoryRepository implements RepositoryInterface
{
    use CategoryTrait;

    public function all($status = null, $search = null, $pageSize = null)
    {
        return $this->listHandler($status);
    }

    public function get($category)
    {
        $instance = $category->viewCounts;
        $instance->view_count++;
        $instance->save();
    }

    public function delete($category)
    {
        $this->parentHandler($category);
        $category->update(['status' => 'deactivate']);

        return $category->delete();
    }

    public function update(array $data, $category)
    {dd($data);
        $category = Category::find($category);
        $data['slug'] = ($data['slug'] != $category->slug) ? $this->slugHandler($data['slug']) : $category->slug;

        if (!empty($data['image']) && !is_string($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        elseif (is_string($data['image']) && $data['image'] == 'true')
            unset($data['image']);
        else
            $data['image'] = null;

        return $category->update($data);
    }

    public function create(array $data)
    {
        $data['parent_id'] = !empty($data['parent_id']) ? (int)$data['parent_id'] : 0 ;

        $data['slug'] = $this->slugHandler($data['slug']);

        $data['user_id'] = Auth::id();

        if (!empty($data['image']) && !is_string($data['image'])) {
            $data['image'] = $this->imageHandler($data['image']);
        } elseif (is_string($data['image']) && $data['image'] == 'true') {
            $path = (Category::find($data['id']))->image;
            $time = time();
            $newPath = substr_replace($path, $time, '14', 0);

            Storage::copy($path, $newPath);
            $data['image'] = $newPath;
        } else {
            $data['image'] = null;
        }

        if (!empty('id'))
            unset($data['id']);

        $data['is_menu'] = (int)$data['is_menu'];

        $category = Category::create($data);
        $category->viewCounts()->create();
        return $category;
    }

    public function multipleDestroy($data)
    {
        $this->parentHandler($data);
        return Category::whereIn('id', $data['categoryIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
