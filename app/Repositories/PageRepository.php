<?php


namespace App\Repositories;


use App\Http\Controllers\Admin\Page\Traits\PageTrait;
use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PageRepository implements Interfaces\RepositoryInterface
{
    use PageTrait;

    public function all($status = null, $search = null, $owner = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($owner))
            $owner = 'page';

        return Page::when($search != null, function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        })->whereOwner($owner)
            ->when($status = !null, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->where('published_at', '<=', Carbon::now())
            ->with('user')
            ->paginate($pageSize);
    }

    public function get($page)
    {
        $instance = $page->viewCounts;
        $instance->view_count++;
        $instance->save();
    }

    public function delete($page)
    {
        $page->update(['status' => 'deactivate']);
        return $page->delete();
    }

    public function update(array $data, $page)
    {
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);

        return $page->update($data);
    }

    public function create(array $data)
    {
        $data['metadata'] = !empty($data['metadata']) ? json_encode($data['metadata']) : null;

        $index['user_id'] = Auth::id();
        $page = Page::create($data);;
        $page->viewCounts()->create();
        $page->update($index);
        return $page;
    }

    public function multipleDestroy($data)
    {
            Page::whereIn('id', $data['pageIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
    }
}
