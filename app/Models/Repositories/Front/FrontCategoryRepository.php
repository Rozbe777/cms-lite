<?php


namespace App\Models\Repositories\Front;


use App\Models\Category;

class FrontCategoryRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        return Category::when(!empty($slug), function ($query) use ($slug) {
            $query->where('name', 'like', '%' . $slug . '%')
                ->orWhere('slug', 'like', '%' . $slug . '%')
                ->orWhere('content', 'like', '%' . $slug . '%');
        })->with('contents')
            ->with('user')
            ->with('viewCounts')
            ->orderByDesc('id')
            ->paginate(config('view.pagination'));
    }
}
