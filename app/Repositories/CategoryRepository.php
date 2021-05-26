<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Category;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CategoryRepository implements RepositoryInterface
{

    public function all($status = null, $search = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($status))
            $status = 'active';

        return Category::with('contents')
            ->where('status', $status)
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
        $category->update(['status' => 'deactivate']);
        return $category->delete();
    }

    public function update(array $data, $category)
    {
//            /** modify tag relations in database tables */
//            if (array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
//                $tag_list_old = $data['tag_list_old'];
//                $tag_list_new = $data['tag_list_new'];
//                (new RelationsService())->tagService($category, $tag_list_old, $tag_list_new);
//                unset($data['tag_list_old'], $data['tag_list_new']);
//
//            } elseif (!array_key_exists('tag_list_old', $data)) {
//                $tag_list_new = $data['tag_list_new'];
//                (new RelationsService())->tagService($category, '', $tag_list_new);
//                unset($data['tag_list_new']);
//
//            } elseif (!array_key_exists('tag_list_new', $data)) {
//                $tag_list_old = $data['tag_list_old'];
//                (new RelationsService())->tagService($category, $tag_list_old, '');
//                unset($data['tag_list_old']);
//            }
            return $category->update($data);
    }

    public function create(array $data)
    {
        $index['user_id'] = Auth::id();
        $category = Category::create($data);
        $category->viewCounts()->create();
        $category->update($index);
        return $category;
    }

    public function multipleDestroy($data)
    {
        return Category::whereIn('id', $data['categoryIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
