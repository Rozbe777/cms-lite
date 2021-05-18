<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PageRepository implements Interfaces\RepositoryInterface
{

    public function all()
    {
        try {
            return Page::with('user')
                ->with('contents')
                ->with('tags')
                ->with('categories')
                ->where('published_at', '<=', Carbon::now())
                ->where('status','active')
                ->paginate(12);

        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($page)
    {
        $instance = $page->viewCounts;
        $instance->view_count ++;
        $instance->save();
    }

    public function delete($page)
    {
        $page->update(['status' => 'deactivate']);
        return $page->delete();
    }

    public function update(array $data, $page)
    {
        try {
            /** modify tag relations in database tables */
            if (array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($page,$tag_list_old,$tag_list_new);
                unset($data['tag_list_old'], $data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_old', $data)) {
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($page,'',$tag_list_new);
                unset($data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                (new RelationsService())->tagService($page,$tag_list_old,'');
                unset($data['tag_list_old']);
            }

            /** modify category relations in database tables */
            if (array_key_exists('category_list_old', $data) && array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($page,$category_list_old,$category_list_new);
                unset($data['category_list_old'], $data['category_list_new']);

            } elseif (!array_key_exists('category_list_old', $data)) {
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($page,'',$category_list_new);
                unset($data['category_list_new']);

            } elseif (!array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                (new RelationsService())->categoryService($page,$category_list_old,'');
                unset($data['category_list_old']);
            }

            return $page->update($data);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function create(array $data)
    {
        try {
            $tag_list = $data['tag_list'];
            $category_list = $data['category_list'];
            unset($data["tag_list"], $data['category_list']);

            $index['user_id'] = Auth::id();
            $page = Page::create($data);;
            $page->viewCounts()->create();
            $page->tags()->attach($tag_list);
            $page->tags()->attach($category_list);
            $page->update($index);
            return $page;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function multipleDestroy($data)
    {
        try {
            Page::whereIn('id', $data['pageIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }
}
