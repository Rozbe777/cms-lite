<?php


namespace App\Models\Repositories\Admin;


use App\Models\Tag;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TagRepositories implements RepositoryInterface
{

    /**
     * @param null $status
     * @param null $search
     * @param null $pageSize
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
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

    /**
     * @param $tag
     */
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

    /**
     * @param array $data
     * @param $tag
     * @return mixed
     */
    public function update(array $data, $tag)
    {
        return $tag->update($data);
    }

    /**
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        $i =0;

        foreach ($data['name'] as $name) {
            $tag = new Tag();
            $tag->name = $name;
            $tag->user_id = Auth::id();
            $tag->save();
            $tag->viewCounts()->create();
            $tags[$i] = $tag;
            $i++;
        }
        return $tags;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function multipleDestroy($data)
    {
        return Tag::whereIn('id', $data['tagIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);

    }
}
