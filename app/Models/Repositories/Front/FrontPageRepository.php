<?php


namespace App\Models\Repositories\Front;


use App\Models\Content;
use App\Models\Page;

class FrontPageRepository implements Interfaces\FrontInterface
{
    public function search(string $slug)
    {
        $page = Page::when(!empty($slug), function ($query) use ($slug) {
            $query->where(function ($q) use ($slug) {
                $q->Where('slug',$slug);
            })->where('owner', 'page');
        })->with('user')
            ->with('viewCounts')
            ->orderByDesc('id')->firstOrFail();

        $instance = $page->viewCounts;
        $instance->view_count++;
        $instance->save();

        return $page;
    }
}
