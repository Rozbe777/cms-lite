<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements Interfaces\RepositoryInterface
{
    public function all($status = 'active', $search = null, $owner = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($status))
            $status = 'active';

        if (empty($owner))
            $owner = 'content';

        return Content::when($search != null, function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        })->whereOwner($owner)
            ->whereStatus($status)
            ->where('published_at', '<=', Carbon::now())
            ->with('user')
            ->with('tags')
            ->with('categories')
            ->paginate($pageSize);
    }

    public function get($content)
    {
        $instance = $content->viewCounts;
        $instance->view_count++;
        $instance->save();
    }

    public function delete($content)
    {
        $content->update(['status' => 'deactivate']);
        return $content->delete();
    }

    public function update(array $data, $content)
    {
        try {
            /** modify tag relations in database tables */
            if (array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($content, $tag_list_old, $tag_list_new);
                unset($data['tag_list_old'], $data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_old', $data)) {
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($content, '', $tag_list_new);
                unset($data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                (new RelationsService())->tagService($content, $tag_list_old, '');
                unset($data['tag_list_old']);
            }

            /** modify category relations in database tables */
            if (array_key_exists('category_list_old', $data) && array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($content, $category_list_old, $category_list_new);
                unset($data['category_list_old'], $data['category_list_new']);

            } elseif (!array_key_exists('category_list_old', $data)) {
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($content, '', $category_list_new);
                unset($data['category_list_new']);

            } elseif (!array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                (new RelationsService())->categoryService($content, $category_list_old, '');
                unset($data['category_list_old']);
            }

            return $content->update($data);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function create(array $data)
    {
            $tag_list = $data['tag_list'];
            unset($data["tag_list"]);

        $category_list = $data['category_list'];
        unset($data["category_list"]);

            $index['user_id'] = Auth::id();
            $content = Content::create($data);
            $content->viewCounts()->create();
            $content->tags()->attach($tag_list);
            $content->categories()->attach($category_list);
            $content->update($index);
            return $content;
    }

    public function multipleDestroy($data)
    {
        return Content::whereIn('id', $data['contentIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
