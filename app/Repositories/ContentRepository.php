<?php


namespace App\Repositories;


use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements Interfaces\RepositoryInterface
{

    public function all()
    {
        try {
            return Content::with('user')->with('tags')->with('categories')->where('published_at', '<=', Carbon::now())->paginate(12);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($content)
    {
        $content->update(['status' => 'deactivate']);
        return $content->delete();
    }

    public function update(array $data, $content)
    {
        try {
            $tag_list_old = $data['tag_list_old'];
            $tag_list_new = $data['tag_list_new'];
            unset($data['tag_list_old'],$data['tag_list_new']);

            return $content->update($data);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function create(array $data)
    {
        try {
            $tag_list = $data['tag_list'];
            unset($data["tag_list"]);

            $index['user_id'] = Auth::id();
            $content = Content::create($data);
            $content->tags()->attach($tag_list);
            $content->update($index);
            return $content;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function multipleDestroy($data)
    {
        try {
            Content::whereIn('id', $data['contentIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }
}
