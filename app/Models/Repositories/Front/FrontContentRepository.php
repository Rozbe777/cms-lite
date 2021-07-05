<?php


namespace App\Models\Repositories\Front;


use App\Classes\Counter\Counter;
use App\Models\Content;

class FrontContentRepository implements Interfaces\FrontInterface
{
    public function search(string $slug)
    {
        $content = Content::when(!empty($slug), function ($query) use ($slug) {
            $query->where(function ($q) use ($slug) {
                $q->Where('slug',$slug);
            })->active();
        })->with('tags')
            ->with('categories')
            ->with('user')
            ->with('viewCounts')
            ->orderByDesc('id')->firstOrFail();

         (new Counter())->count($content);

        return $content;
    }
}
