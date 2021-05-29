<?php


namespace App\Http\Controllers\Admin\Content\Traits;


use App\Models\Content;

trait ContentTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('images', $imageName);
    }

    public function slugHandler($slug)
    {
        if (Content::where('slug', '=', $slug)->exists()) {
            $i = 1;
            do {
                $item = $slug . '_' . $i++;
            } while ((Content::where('slug', "=", $item)->count()) != 0);
            return $item;

        } else {
            return $slug;
        }
    }
}
