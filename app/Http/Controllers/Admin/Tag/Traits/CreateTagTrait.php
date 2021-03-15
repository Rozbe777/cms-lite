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
        if (!empty($tag['slug']))
            $tagModel->slug = $tag['slug'];
        if (!empty($tag['image']))
            $tagModel->image = $tag['image'];
        if (!empty($tag['description']))
            $tagModel->description = $tag['description'];
        if (!empty($tag['fields']))
            $tagModel->fields = $tag['fields'];
        if (!empty($tag['parent_id']))
            $tagModel->parent_id = bcrypt($tag['parent_id']);
        if (!empty($tag['layout_id']))
            $tagModel->layout_id = bcrypt($tag['layout_id']);
        if (!empty($tag['module_id']))
            $tagModel->module_id = bcrypt($tag['module_id']);
        if (!empty($tag['status']))
            $tagModel->status = bcrypt($tag['status']);
        $tagModel->save();
        return $tagModel;
    }
}
