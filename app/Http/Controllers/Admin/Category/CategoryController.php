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
use App\Models\CategoryTag;
use App\Models\Tag;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use EditCategoryTrait, CreateCategoryTrait;

    public function index()
    {
        return adminView("pages.admin.category.index");
    }

    function getChildrenCategories($categoryId)
    {
        $categories = Category::whereParentId($categoryId)->get();
        foreach ($categories as $category) {
            $category->children = $this->getChildrenCategories($category->id);
        }
        return $categories;
    }

    public function list()
    {
        $categories = Category::whereParentId(0)->get();
        foreach ($categories as $category) {
            $category->childern = $this->getChildrenCategories($category->id);
        }
        return $categories;
    }

    public function store(CreateCategoryRequest $request)
    {

        $category = $this->createCategory(
            [
                'name' => $request->input('name'),
                'slug' => $request->input('slug'),
                'image' => $request->image,
                'content' => $request->input('content'),
                'fields' => $request->input('fields'),
                'parent_id' => $request->input('parent_id'),
                'layout_id' => $request->input('layout_id'),
                'module_id' => $request->input('module_id'),
                'status' => $request->input('status'),
                'is_menu' => $request->input('is_menu'),

            ]
        );


        if ($request->input('tag_list'))
            foreach ($request->input('tag_list') as $tagName) {
                $tag = Tag::firstOrCreate([
                    'name' => $tagName
                ]);
                CategoryTag::firstOrCreate([
                    'tag_id' => $tag->id,
                    'category_id' => $category->id,
                ]);
            }


        return redirect(route("admin.category.index"))->with("info", "ثبت دسته بندی با موفقیت انجام شد");


    }

    public function create()
    {
        return adminView("pages.admin.category.create");
    }

    public function edit($categoryId)
    {
        $category = Category::findOrFail($categoryId);
        return adminView("pages.admin.category.edit")->with("category", $category);
    }

    public function destroy($id)
    {
        Category::findOrFail($id)->delete();
        return redirect(route("admin.category.index"))->with("info", "عملیات حذف دسته بندی موفقیت انجام شد");
    }

    public function multipleDestroy(multipleDestroyRequest $request)
    {
        if (isset($request->categoryIds))
            Category::whereIn('id', $request->input('categoryIds'))->delete();

        return redirect(route("admin.category.index"))->with('info', 'دسته بندی های انتخاب شده حذف شدند');

    }

    public function update(EditCategoryRequest $request, $categoryId)
    {
        $category = $this->EditCategory([
            'name' => $request->input('name'),
            'slug' => $request->input('slug'),
            'image' => $request->image,
            'content' => $request->input('content'),
            'fields' => $request->input('fields'),
            'parent_id' => $request->input('parent_id'),
            'layout_id' => $request->input('layout_id'),
            'module_id' => $request->input('module_id'),
            'status' => $request->input('status'),
            'category_id' => $categoryId,
            'is_menu' => $request->input('is_menu'),


        ]);

        if ($request->input('tag_list'))
            foreach ($request->input('tag_list') as $tagName) {
                $tag = Tag::firstOrCreate([
                    'name' => $tagName
                ]);
                CategoryTag::firstOrCreate([
                    'tag_id' => $tag->id,
                    'category_id' => $categoryId,
                ]);
            }

        return redirect(route("admin.category.edit", $categoryId))->with("info", "عملیات ویرایش دسته بندی با موفقیت انجام شد");


    }

    public function search(SearchCategoryRequest $request)
    {
        $searchHelper = new \CategorySearchHelper($request);
        $categories = $searchHelper->searchCategories();
        $categories = $searchHelper->statusCategory($categories);

        return adminView("pages.admin.category.index")->with('categories', $categories);

    }

}
