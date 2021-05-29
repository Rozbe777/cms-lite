<?php


namespace App\Repositories;


use App\Http\Controllers\Admin\Content\Traits\ContentTrait;
use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements Interfaces\RepositoryInterface
{
    use ContentTrait;

    public function all($status = null, $search = null, $owner = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($owner))
            $owner = 'content';

        return Content::when($search != null, function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        })->whereOwner($owner)
            ->when($status = !null, function ($query) use ($status) {
                $query->where('status', $status);
            })
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
        $data['slug'] = $this->slugHandler($data['slug']);

        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        /** modify tag relations in database tables */
        if (array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
            $tag_list_old = $data['tag_list_old'];
            $tag_list_new = $data['tag_list_new'];
            (new RelationsService())->tagService($content, $tag_list_old, $tag_list_new);
            unset($data['tag_list_old'], $data['tag_list_new']);

        } elseif (!array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
            $tag_list_new = $data['tag_list_new'];
            (new RelationsService())->tagService($content, '', $tag_list_new);
            unset($data['tag_list_new']);

        } elseif (!array_key_exists('tag_list_new', $data) && array_key_exists('tag_list_old', $data)) {
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

        } elseif (!array_key_exists('category_list_old', $data) && array_key_exists('category_list_new', $data)) {
            $category_list_new = $data['category_list_new'];
            (new RelationsService())->categoryService($content, '', $category_list_new);
            unset($data['category_list_new']);

        } elseif (!array_key_exists('category_list_new', $data) && array_key_exists('category_list_old', $data)) {
            $category_list_old = $data['category_list_old'];
            (new RelationsService())->categoryService($content, $category_list_old, '');
            unset($data['category_list_old']);
        }
        return $content->update($data);
    }

    public function create(array $data)
    {
        $data['slug'] = $this->slugHandler($data['slug']);
        $data['metadata'] = !empty($data['metadata']) ? json_encode($data['metadata']) : null;

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $category_list = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        $content = Content::create($data);

        $content->viewCounts()->create();

        $content->tags()->attach($tag_list);
        $content->categories()->attach($category_list);
        return $content;
    }

    public function multipleDestroy($data)
    {
        return Content::whereIn('id', $data['contentIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
