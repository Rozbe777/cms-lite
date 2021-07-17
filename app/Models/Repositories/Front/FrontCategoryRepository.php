<?php


namespace App\Models\Repositories\Front;


use App\Classes\Counter\Counter;
use App\Models\Category;
use App\Models\Module;


class FrontCategoryRepository implements Interfaces\FrontInterface
{

    public function search(string $slug)
    {
        $category = Category::when(!empty($slug), function ($query) use ($slug) {
            $query->Where('slug', $slug);
        })->whereModuleId(Module::CMS_MODULE_ID)->with('contents')
            ->with('user')
            ->with('viewCounts')
            ->orderByDesc('id')
            ->firstOrFail();

        (new Counter())->count($category);

        return $category;
    }
}
