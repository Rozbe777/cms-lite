<?php


namespace App\Models\Repositories\Front;


use App\Models\Category;

class FrontCategoryRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        $category = Category::when(!empty($slug), function ($query) use ($slug) {
            $query->Where('slug',$slug);
        })->with('contents')
            ->with('user')
            ->with('viewCounts')
            ->orderByDesc('id')
            ->firstOrFail();

        $instance = $category->viewCounts;
        $instance->view_count++;
        $instance->save();

        return $category;
    }
}
