<?php


namespace App\Repositories;


use App\Http\Controllers\Admin\Category\Traits\CategoryTrait;
use App\Models\Category;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
    {
        if (! empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        return $category->update($data);
    }

    public function create(array $data)
    {
        $slug = $data['slug'];
        unset($data['slug']);
        $index['user_id'] = Auth::id();
        $index['slug'] = $this->slugHandler($slug);

        if (!empty($data['image']))
            $index['image'] = $this->imageHandler($data['image']);

        $category = Category::create($data);
        $category->viewCounts()->create();
        $category->update($index);
        return $category;
    }

    public function multipleDestroy($data)
    {
        $this->parentHandler($data);
        return Category::whereIn('id', $data['categoryIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
