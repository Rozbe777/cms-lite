<?php

namespace App\Http\Controllers\Admin\Category\Traits;

use App\Helpers\FileManager\FileManager;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

trait EditCategoryTrait
{

    function EditCategory($category = [])
    {
        $categoryModel = Category::find($category['category_id']);  //category_id is required


        if (!empty($category['name']))
            $categoryModel->name = $category['name'];

        if (!empty($category['slug']))
            $categoryModel->slug = $category['slug'];

        if (isset($category['image'])){
//            Storage::delete($categoryModel->image);//FIXME delete last image after update
            $file_path = config("upload.path.category_images");

            $file_name = FileManager::type('image')
                ->make($category['image'])
                ->upload($file_path);

            $categoryModel->image = $file_name;

        }

        if (!empty($category['content']))
            $categoryModel->content = $category['content'];

        if (!empty($category['metadata']))
            $categoryModel->metadata = $category['metadata'];

        if (!empty($category['parent_id']))
            $categoryModel->parent_id = bcrypt($category['parent_id']);

        if (!empty($category['layout_id']))
            $categoryModel->layout_id = $category['layout_id'];

        if (!empty($category['module_id']))
            $categoryModel->module_id = $category['module_id'];

        if (!empty($category['status']))
            $categoryModel->status = $category['status'];

        if (!empty($category['is_menu']))
            $categoryModel->is_menu = $category['is_menu'];

        $categoryModel->save();

        return $categoryModel;




    }
}
