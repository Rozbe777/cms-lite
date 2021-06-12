<?php


namespace App\Http\Controllers\Admin\Page\Traits;


use App\Models\Page;

trait PageTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('images', $imageName);
    }

    public function slugHandler($slug)
    {
        if (Page::where('slug', '=', $slug)->exists()) {
            $i = 1;
            do {
                $item = $slug . '_' . $i++;
            } while ((Page::where('slug', "=", $item)->count()) != 0);
            return $item;

        } else {
            return $slug;
        }
    }

    public function indexHandler()
    {
        Page::where('is_index',1)->update(['is_index' => 0]);
    }
}
