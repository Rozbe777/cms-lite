<?php


namespace App\Models\Repositories\Front;


use App\Models\Tag;

class FrontTagRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        $tag = Tag::when(!empty($slug), function ($query) use ($slug) {
        $query->where('name', $slug);
    })
        ->with('contents')
        ->with('user')
        ->with('viewCounts')
        ->orderByDesc('id')
        ->firstOrFail();

        $instance = $tag->viewCounts;
        $instance->view_count++;
        $instance->save();

        return $tag;

    }
}
