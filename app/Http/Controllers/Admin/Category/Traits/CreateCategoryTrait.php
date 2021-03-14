<?php


namespace App\Http\Controllers\Admin\Category\Traits;


use App\Models\Category;


trait CreateCategoryTrait
{

    public function createCategory($category): Category
    {
        $categoryModel = new Category();
        if (!empty($category['name']))
            $categoryModel->name = $category['name'];
        if (!empty($category['slug']))
            $categoryModel->slug = $category['slug'];
        if (!empty($category['image']))
            $categoryModel->image = $category['image'];
        if (!empty($category['description']))
            $categoryModel->description = $category['description'];
        if (!empty($user['fields']))
            $categoryModel->fields = $user['fields'];
        if (!empty($user['parent_id']))
            $categoryModel->parent_id = bcrypt($user['parent_id']);
        if (!empty($user['layout_id']))
            $categoryModel->layout_id = bcrypt($user['layout_id']);
        if (!empty($user['module_id']))
            $categoryModel->module_id = bcrypt($user['module_id']);
        if (!empty($user['status']))
            $categoryModel->status = bcrypt($user['status']);
        $categoryModel->save();
        return $categoryModel;
    }
}
