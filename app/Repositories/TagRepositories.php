<?php


namespace App\Repositories;


use App\Models\Tag;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TagRepositories implements RepositoryInterface
{

    public function all()
    {
        try {
            return Tag::with('contents')->with('categories')->paginate(12);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($tag)
    {
        $tag->update(['status' => 'deactivate']);
        return $tag->delete();
    }

    public function update(array $data, $tag)
    {
        try {
            $category_list_old = $data['category_list_old'];
            $category_list_new = $data['category_list_new'];
            unset($data['category_list_old'],$data['category_list_new']);

            return $tag->update($data);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function create(array $data)
    {
        try {
            $category_list = $data['category_list'];
            unset($data['category_list']);

            $index['user_id'] = Auth::id();
            $tag = Tag::create($data);
            $tag->categories()->attach($category_list);
            $tag->update($index);
            return $tag;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function multipleDestroy($data)
    {
        try {
            Tag::whereIn('id', $data['tagIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }
}
