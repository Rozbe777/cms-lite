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
        if (!empty($category['fields']))
            $categoryModel->fields = $category['fields'];
        if (!empty($category['parent_id']))
            $categoryModel->parent_id = bcrypt($category['parent_id']);
        if (!empty($category['layout_id']))
            $categoryModel->layout_id = bcrypt($category['layout_id']);
        if (!empty($category['module_id']))
            $categoryModel->module_id = bcrypt($category['module_id']);
        if (!empty($category['status']))
            $categoryModel->status = bcrypt($category['status']);
        $categoryModel->save();
        return $categoryModel;
    }
}
