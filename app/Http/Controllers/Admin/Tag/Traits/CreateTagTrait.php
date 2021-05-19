<?php


namespace App\Http\Controllers\Admin\Tag\Traits;


use App\Models\Tag;


trait CreateTagTrait
{

    public function createTag($tag)
    {
        $tagModel = new Tag();
        if (!empty($tag['name']))
            $tagModel->name = $tag['name'];

        $tagModel->save();
        return $tagModel;
    }
}
