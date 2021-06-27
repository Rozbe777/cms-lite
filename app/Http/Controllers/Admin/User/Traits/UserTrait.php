<?php


namespace App\Http\Controllers\Admin\User\Traits;


trait UserTrait
{
    public function imageHandler($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        return $image->storeAs('public/images', $imageName);
    }
}
