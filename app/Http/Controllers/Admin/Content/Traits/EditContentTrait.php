<?php


namespace App\Http\Controllers\Admin\Content\Traits;


use App\Helpers\FileManager\FileManager;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

        if (isset($content['image'])){
//            Storage::delete($contentModel->image);//FIXME delete last image after update

            if (Storage::exists('public/'.$contentModel->image))
                unlink(storage_path('app/public/'.$contentModel->image));

            $file_path = config("upload.path.content_images");

            $file_name = FileManager::type('image')
                ->make($content['image'])
                ->upload($file_path);

            $contentModel->image = $file_name;

        }

        if (!empty($content['comment_status']))
            $contentModel->comment_status = $content['comment_status'];

        if (!empty($content['weight']))
            $contentModel->weight = $content['weight'];

        if (!empty($content['is_index']))
            $contentModel->is_index = $content['is_index'];

        if (!empty($content['is_menu']))
            $contentModel->is_menu = $content['is_menu'];



        $contentModel->save();

        return $contentModel;
    }
}
