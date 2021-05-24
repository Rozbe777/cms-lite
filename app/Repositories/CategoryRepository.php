<?php


namespace App\Repositories;


use App\Http\Requests\Admin\Services\RelationsService;
use App\Models\Category;
use App\Repositories\Interfaces\RepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CategoryRepository implements RepositoryInterface
{

    public function all()
    {
        try {
            return Category::with('contents')
                ->with('tags')
                ->where('status','deactivate')
                ->paginate(12);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function get($category)
    {
        $instance = $category->viewCounts;
        $instance->view_count ++;
        $instance->save();
    }

    public function delete($category)
    {
        $category->update(['status' => 'deactivate']);
        return $category->delete();
    }

    public function update(array $data, $category)
    {
        try {
            /** modify tag relations in database tables */
            if (array_key_exists('tag_list_old', $data) && array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($category,$tag_list_old,$tag_list_new);
                unset($data['tag_list_old'], $data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_old', $data)) {
                $tag_list_new = $data['tag_list_new'];
                (new RelationsService())->tagService($category,'',$tag_list_new);
                unset($data['tag_list_new']);

            } elseif (!array_key_exists('tag_list_new', $data)) {
                $tag_list_old = $data['tag_list_old'];
                (new RelationsService())->tagService($category,$tag_list_old,'');
                unset($data['tag_list_old']);
            }
            return $category->update($data);
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function create(array $data)
    {
        try {
            $tag_list = $data['tag_list'];
            unset($data['tag_list']);

            $index['user_id'] = Auth::id();
            $category = Category::create($data);
            $category->viewCounts()->create();
            $category->tags()->attach($tag_list);
            $category->update($index);
            return $category;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }

    public function multipleDestroy($data)
    {
        try {
            Category::whereIn('id', $data['categoryIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
            return true;
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }
    }
}
