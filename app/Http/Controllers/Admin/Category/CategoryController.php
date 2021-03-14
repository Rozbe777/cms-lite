<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Admin\Category\Traits\CreateCategoryTrait;
use App\Http\Controllers\Admin\Category\Traits\EditCategoryTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Category\CreateCategoryRequest;
use App\Http\Requests\Admin\Category\EditCategoryRequest;
use App\Http\Requests\Admin\Category\multipleDestroyRequest;
use App\Http\Requests\Admin\Category\SearchCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    use EditCategoryTrait,CreateCategoryTrait;
    public function index()
    {
        $categories=Category::paginate(12);

        return adminView("pages.admin.user.index")->with('categories',$categories);

    }

    public function store(CreateCategoryRequest $request){
        $category=$this->createCategory(
            [
                'name'=>$request->input('name'),
                'slug'=>$request->input('slug'),
                'image'=>$request->input('image'),
                'description'=>$request->input('description'),
                'fields'=>$request->input('fields'),
                'parent_id'=>$request->input('parent_id'),
                'layout_id'=>$request->input('layout_id'),
                'module_id'=>$request->input('module_id'),
                'status'=>$request->input('status'),

            ]
        );

        return redirect(route("admin.category.index"))->with("info", "ثبت دسته بندی با موفقیت انجام شد");



    }

    public function create()
    {
        return adminView("pages.admin.category.create");
    }

    public function edit($categoryId)
    {
        $category=Category::findOrFail($categoryId);
        return adminView("pages.admin.category.edit")->with("category",$category);
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return redirect(route("admin.category.index"))->with("info", "عملیات حذف دسته بندی موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->userIds))
            Category::where('id',$request->input('categoryIds'))->delete();

        return redirect(route("admin.category.index"))->with('info','دسته بندی های انتخاب شده حذف شدند');

    }



    public function update(EditCategoryRequest $request,$categoryId)
    {
//|unique:users,email,'.$this->request->get("userId")
        $user=$this->EditCategory([
            'name'=>$request->input('name'),
            'slug'=>$request->input('slug'),
            'image'=>$request->input('image'),
            'description'=>$request->input('description'),
            'fields'=>$request->input('fields'),
            'parent_id'=>$request->input('parent_id'),
            'layout_id'=>$request->input('layout_id'),
            'module_id'=>$request->input('module_id'),
            'status'=>$request->input('status'),

        ]);

        return redirect(route("admin.category.edit",$categoryId))->with("info", "عملیات ویرایش دسته بندی با موفقیت انجام شد");


    }

    public function search(SearchCategoryRequest $request){
        $searchHelper=new \CategorySearchHelper($request);
        $categories=$searchHelper->searchCategories();
        $categories=$searchHelper->statusCategory($categories);

        return adminView("pages.admin.category.index")->with('categories',$categories);

    }




}
