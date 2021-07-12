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

    public function all($status = 'active', $search = null, $pageSize = null, $routeName = null)
    {
        $moduleId = str_contains($routeName, 'product') ? 2 : 1;
        $status = empty($status) ? 'active' : $status;

        return $this->listHandler($status, $moduleId);
    }

    public function retrieveAll($status = null, $search = null, $pageSize = null, $routeName = null)
    {
        $moduleId = str_contains($routeName, 'product') ? 2 : 1;

        $pageSize = empty($pageSize) ? config('view.pagination') : $pageSize;
        $status = empty($status) ? 'active' : $status;
        $moduleId = empty($moduleId) ? 1 : $moduleId;

        return Category::when(!empty($search), function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('slug', 'like', '%' . $search . '%')
                    ->orWhere('content', 'like', '%' . $search . '%');
            });
        })->where('module_id', $moduleId)
            ->where('status', $status)
            ->orderByDesc('id')
            ->paginate($pageSize);
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

    public function create(array $data , $routeName=null)
    {
        $data['module_id'] = str_contains($routeName, 'product') ? 2 : 1;
        $data['parent_id'] = !empty($data['parent_id']) ? (int)$data['parent_id'] : 0;

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
