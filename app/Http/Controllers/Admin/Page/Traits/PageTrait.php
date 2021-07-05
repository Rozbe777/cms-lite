<?php


namespace App\Http\Controllers\Admin\Page\Traits;


use App\Models\Page;

trait PageTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('public/images', $imageName);
    }

    public function slugHandler($slug)
    {
    /*    $slug = str_replace(' ', '-', $slug);*/
        if (Page::where('slug', $slug)->withTrashed()->first()) {
            $slug .= $slug . "-1";
            return $this->slugHandler($slug);
        }
        return $slug;
    }

    public function indexHandler()
    {
        Page::where('is_index', 1)->update(['is_index' => 0]);
    }
}
