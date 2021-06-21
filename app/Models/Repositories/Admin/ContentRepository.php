<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Content\Traits\ContentTrait;
use App\Models\Category;
use App\Models\Content;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements RepositoryInterface
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
            $query->where(function ($q) use ($search){
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('slug', 'like', '%' . $search . '%')
                    ->orWhere('content', 'like', '%' . $search . '%');
            });
        })->where('owner', 'content')
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
            ->orderByDesc('id')->paginate(config('view.pagination'));
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

        $tag_list = $data['tag_list'] ?? [];
        unset($data["tag_list"]);

        $category_list = $data['category_list'] ?? [];
        unset($data["category_list"]);

        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        /** modify tag relations in database tables */
        foreach ($tag_list as $tag) {
            $tag = Tag::firstOrCreate(
                ['name' => $tag],
                ['user_id' => Auth::id()]
            );
            if ($tag->wasRecentlyCreated) {
                $content->tags()->attach($tag);
            } else {
                $content->tags()->sync($tag);
            }
        }
        /** modify category relations in database tables */
        foreach ($category_list as $category) {
            $category = Category::findOrFail((int)$category);
            $content->categories()->attach($category);
        }

        return $content->update($data);
    }

    public function create(array $data)
    {
        $data['slug'] = $this->slugHandler($data['slug']);

        $tag_list = $data['tag_list'] ?? null;
        unset($data["tag_list"]);

        $category_list = $data['category_list'] ?? null;
        unset($data["category_list"]);

        $data['user_id'] = Auth::id();
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        $content = Content::create($data);

        $content->viewCounts()->create();


        foreach ($tag_list as $tag) {
            $tag = Tag::firstOrCreate(
                ['name' => $tag],
                ['user_id' => Auth::id()]
            );
            $content->tags()->attach($tag);

        }
        foreach ($category_list as $category) {
            $category = Category::findOrFail((int)$category);
            $content->categories()->sync($category);
        }

        return $content;
    }

    public function multipleDestroy($data)
    {
        return Content::whereIn('id', $data['contentIds'])->delete();

    }
}
