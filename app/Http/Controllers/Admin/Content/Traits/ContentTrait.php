<?php


namespace App\Http\Controllers\Admin\Content\Traits;


use App\Models\Content;
use Illuminate\Support\Facades\Storage;

trait ContentTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('public/images', $imageName);
        return $imageName;
    }

    public function slugHandler($slug)
    {
        if (Content::where('owner','content')->where('slug', '=', $slug)->withTrashed()->exists()) {
            $i = 1;
            do {
                $item = $slug . '_' . $i++;
            } while ((Content::where('owner','content')->where('slug', "=", $item)->withTrashed()->count()) != 0);
            return $item;
        } else {
            return $slug;
        }
    }
}
