<?php


namespace App\Models\Repositories\Front;


use App\Models\Tag;

class FrontTagRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        return Tag::when(!empty($slug), function ($query) use ($slug) {
        $query->where('name', 'like', '%' . $slug . '%');
    })
        ->with('contents')
        ->with('user')
        ->with('viewCounts')
        ->orderByDesc('id')
        ->paginate(config('view.pagination'));
    }
}
