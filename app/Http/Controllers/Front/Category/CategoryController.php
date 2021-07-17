<?php

namespace App\Http\Controllers\Front\Category;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Repositories\Front\FrontCategoryRepository;
use const App\Models\SHOP_MODULE_ID;

class CategoryController extends Controller
{
    use ResponseTrait;

    protected FrontCategoryRepository $repository;

    public function __construct(FrontCategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search($slug = null)
    {
        $category = $this->repository->search($slug);
        $title = $category->name;

        $contents = $category->contents()->orderByDesc('id')->paginate(config('view.pagination'));
        return page('category', compact('category', 'contents', 'title'));


    }
}
