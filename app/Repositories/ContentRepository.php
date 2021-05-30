<?php


namespace App\Repositories;


use App\Http\Controllers\Admin\Content\Traits\ContentTrait;
use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Category;
use App\Models\Content;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements Interfaces\RepositoryInterface
{
    use ContentTrait;

    public function all($status = null, $search = null, $tags = null, $categories = null)
    {
        $owner = 'content';
        if (!empty($tags))
            $tags = array_map('intval', $tags);

        if (!empty($categories))
            $categories = array_map('intval', $categories);

        return Content::when(!empty($search), function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        })->whereOwner($owner)
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->with('user')
            ->when(!empty($tags), function ($query) use ($tags) {
                $query->with(['tags' => function ($query) use ($tags) {
                    $query->whereIn('tags.id', $tags);
                }])->has('tags');
            })->when(empty($tags), function ($query) {
                $query->with('tags');
            })
            ->when(!empty($categories), function ($query) use ($categories) {
                $query->with(['categories' => function ($query) use ($categories) {
                    $query->whereIn('categories.id', $categories);
                }])->has('categories');
            })->when(empty($categories), function ($query) {
                $query->with('categories');
            })
            ->get();
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
//        $data['metadata'] = !empty($data['metadata']) ? json_encode($data['metadata']) : null;

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $category_list = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        $content = Content::create($data);

        $content->viewCounts()->create();
        foreach ($tag_list as $tag) {
                $tag = Tag::firstOrCreate(
                    ['name' => $tag],
                    ['user_id' => Auth::id()]
                );
            $content->tags()->attach($tag);
}
        foreach ($category_list as $category){
            $category = Category::findOrFail((int)$category);
            $content->categories()->attach($category);
        }

        return $content;
    }

    public function multipleDestroy($data)
    {
        return Content::whereIn('id', $data['contentIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
