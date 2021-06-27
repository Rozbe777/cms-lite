<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\Page\Traits\PageTrait;
use App\Models\Content;
use App\Models\Page;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PageRepository implements RepositoryInterface
{
    use PageTrait;

    public function all($status = null, $search = null, $owner = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

            $owner = 'page';

        return Page::when(!empty($search), function ($query) use ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('slug', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        })->whereOwner($owner)
            ->when(!empty($status), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->where('published_at', '<=', Carbon::now())
            ->with('user')
            ->orderByDesc('id')->paginate($pageSize);
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
        $page = Page::find($page);
        $data['slug'] = $this->slugHandler($data['slug']);

        if ($data['is_index'] == 1)
            $this->indexHandler();

        if (!empty($data['image']) && !is_string($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        elseif (is_string($data['image']) && $data['image'] == 'true')
            unset($data['image']);
        else
            $data['image'] = null;

        return $page->update($data);
    }

    public function create(array $data)
    {
        $data['owner'] = "page";
        $data['metadata'] = !empty($data['metadata']) ? json_encode($data['metadata']) : null;

        if ((int)$data['is_index'] == 1)
            $this->indexHandler();

        $data['is_menu'] = (int)$data['is_menu'];

        $data['user_id'] = Auth::id();
        $data['owner'] = 'page';
        $data['slug'] = $this->slugHandler($data['slug']);

        if (!empty($data['image']) && !is_string($data['image'])) {
            $data['image'] = $this->imageHandler($data['image']);
        } elseif (is_string($data['image']) && $data['image'] == 'true') {
            $path = (Page::find($data['id']))->image;
            $time = time();
            $newPath = substr_replace($path, $time, '14', 0);

            Storage::copy($path, $newPath);
            $data['image'] = $newPath;
        } else {
            $data['image'] = null;
        }

        if (!empty('id'))
            unset($data['id']);

        $page = Page::create($data);
        $page->viewCounts()->create();
        return $page;
    }

    public function multipleDestroy($data)
    {
            Page::whereIn('id', $data['pageIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
    }
}
