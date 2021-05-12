<?php


namespace App\Repositories;


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
                ->paginate(12);

        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($page)
    {
        $page->update(['status' => 'deactivate']);
        return $page->delete();
    }

    public function update(array $data, $page)
    {
        try {
            $category_list_old = $data['category_list_old'];
            $category_list_new = $data['category_list_new'];
            $tag_list_old = $data['tag_list_old'];
            $tag_list_new = $data['tag_list_new'];
            unset($data['category_list_old'],$data['category_list_new'],$data['tag_list_old'],$data['tag_list_new']);

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
            $page = Page::create($data);
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
