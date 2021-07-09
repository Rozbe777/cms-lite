<?php

namespace App\Http\Controllers\Front\Category;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Repositories\Front\FrontCategoryRepository;

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
        $contents = $category->contents()->orderByDesc('id')->paginate(config('view.pagination'));
        $title = $category->name;
        return page('category', compact('category', 'contents', 'title'));
    }
}
