<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Content\multipleDestroyRequest;
use App\Models\Content;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ContentRepository implements Interfaces\RepositoryInterface
{

    public function all()
    {
        return Content::with('user')->with('tags')->with('categories')->where('published_at','<=', Carbon::now())->get();
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($content)
    {
        $content->update(['status'=>'deactivate']);
        return $content->delete();
    }

    public function update(array $data, $content)
    {
        return $content->update($data);
    }

    public function create(array $data)
    {
        $index['user_id'] = Auth::id();
        $content = Content::create($data);
        $content->update($index);
        return $content;
    }

    public function multipleDestroy($data)
    {
        dd($data);
    }
}
