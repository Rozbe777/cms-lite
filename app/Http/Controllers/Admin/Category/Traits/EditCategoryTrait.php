<?php

namespace App\Http\Controllers\Admin\Category\Traits;

use App\Models\Category;

trait EditCategoryTrait
{

    function EditCategory($category = [])
    {
        $categoryModel = Category::find($category['category_id']);  //category_id is required


        if (!empty($category['name']))
            $categoryModel->name = $category['name'];

        if (!empty($category['slug']))
            $categoryModel->slug = $category['slug'];

        if (!empty($category['image']))
            $categoryModel->image = $category['image'];

        if (!empty($category['content']))
            $categoryModel->content = $category['content'];

        if (!empty($category['fields']))
            $categoryModel->fields = $category['fields'];

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
