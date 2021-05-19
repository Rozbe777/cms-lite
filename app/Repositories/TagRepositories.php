<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Tag;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TagRepositories implements RepositoryInterface
{

    public function all()
    {
        try {
            return Tag::with('contents')
                ->with('categories')
                ->where('status','deactivate')
                ->paginate(12);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($tag)
    {
        $instance = $tag->viewCounts;
        $instance->view_count ++;
        $instance->save();
    }

    public function delete($tag)
    {
        $tag->update(['status' => 'deactivate']);
        return $tag->delete();
    }

    public function update(array $data, $tag)
    {
        try {
            /** modify category relations in database tables */
            if (array_key_exists('category_list_old', $data) && array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($tag,$category_list_old,$category_list_new);
                unset($data['category_list_old'], $data['category_list_new']);

            } elseif (!array_key_exists('category_list_old', $data)) {
                $category_list_new = $data['category_list_new'];
                (new RelationsService())->categoryService($tag,'',$category_list_new);
                unset($data['category_list_new']);

            } elseif (!array_key_exists('category_list_new', $data)) {
                $category_list_old = $data['category_list_old'];
                (new RelationsService())->categoryService($tag,$category_list_old,'');
                unset($data['category_list_old']);
            }

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
            $tag->viewCounts()->create();
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
