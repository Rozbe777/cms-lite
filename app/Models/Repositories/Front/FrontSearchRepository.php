<?php


namespace App\Models\Repositories\Front;


use App\Models\Content;

class FrontSearchRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        return Content::with('tags')
            ->with('categories')
            ->with('user')
            ->with('viewCounts')
            ->when(!empty($slug), function ($query) use ($slug) {
                $query->where(function ($q) use ($slug){
                    $q->where('title', 'like', '%' . $slug . '%')
                        ->orWhere('slug', 'like', '%' . $slug . '%')
                        ->orWhere('content', 'like', '%' . $slug . '%');
                })->where('owner','content');
            })
            ->orderByDesc('id')->paginate(config('view.pagination'));

    }
}
