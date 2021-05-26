<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Tag;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TagRepositories implements RepositoryInterface
{

    public function all($status = null, $search = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($status))
            $status = 'active';

        return Tag::with('contents')
            ->where('status', $status)
            ->paginate($pageSize);
    }

    public function get($tag)
    {
        $instance = $tag->viewCounts;
        $instance->view_count++;
        $instance->save();
    }

    public function delete($tag)
    {
        $tag->update(['status' => 'deactivate']);
        return $tag->delete();
    }

    public function update(array $data, $tag)
    {
//            /** modify category relations in database tables */
//            if (array_key_exists('category_list_old', $data) && array_key_exists('category_list_new', $data)) {
//                $category_list_old = $data['category_list_old'];
//                $category_list_new = $data['category_list_new'];
//                (new RelationsService())->categoryService($tag,$category_list_old,$category_list_new);
//                unset($data['category_list_old'], $data['category_list_new']);
//
//            } elseif (!array_key_exists('category_list_old', $data)) {
//                $category_list_new = $data['category_list_new'];
//                (new RelationsService())->categoryService($tag,'',$category_list_new);
//                unset($data['category_list_new']);
//
//            } elseif (!array_key_exists('category_list_new', $data)) {
//                $category_list_old = $data['category_list_old'];
//                (new RelationsService())->categoryService($tag,$category_list_old,'');
//                unset($data['category_list_old']);
//            }

        return $tag->update($data);
    }

    public function create(array $data)
    {
//            $category_list = $data['category_list'];
//            unset($data['category_list']);

        $index['user_id'] = Auth::id();
        $tag = Tag::create($data);
        $tag->viewCounts()->create();
//            $tag->categories()->attach($category_list);
        $tag->update($index);
        return $tag;
    }

    public function multipleDestroy($data)
    {
        return Tag::whereIn('id', $data['tagIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
