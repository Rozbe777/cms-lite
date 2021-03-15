<?php

namespace App\Http\Controllers\Admin\Tag\Traits;

use App\Models\Tag;

trait EditTagTrait
{

    function EditTag($tag = [])
    {
        $tagModel = Tag::find($tag['tag_id']);  //tag_id is required


        if (!empty($tag['name']))
            $tagModel->name = $tag['name'];

        if (!empty($tag['slug']))
            $tagModel->slug = $tag['slug'];





        $tagModel->save();

        return $tagModel;
    }
}
