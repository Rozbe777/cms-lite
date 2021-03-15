<?php


namespace App\Http\Controllers\Api\Content\Traits;


use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

trait EditContentTrait
{

    function EditContent($content = []): Content
    {
        $contentModel = Content::find($content['content_id']);  //content_id is required


        if (!empty($content['owner']))
            $contentModel->owner = $content['owner'];

        if (!empty($content['title']))
            $contentModel->title = $content['title'];

        if (!empty($content['slug']))
            $contentModel->slug = $content['slug'];

        if (!empty($content['content']))
            $contentModel->content = $content['content'];

        if (!empty($content['fields']))
            $contentModel->fields = $content['fields'];

        if (!empty($content['status']))
            $contentModel->status = $content['status'];

        if (!empty($content['user_id']))
            $contentModel->user_id = $content['user_id'];

        if (!empty($content['layout_id']))
            $contentModel->layout_id = $content['layout_id'];

        if (!empty($content['image']))
            $contentModel->image = $content['image'];

        if (!empty($content['comment_status']))
            $contentModel->comment_status = $content['comment_status'];

        if (!empty($content['weight']))
            $contentModel->weight = $content['weight'];


        $contentModel->save();

        return $contentModel;
    }
}
