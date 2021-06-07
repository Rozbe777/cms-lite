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
        $categories = $this->repository->search($slug);

        return !empty($categories) ?
            $this->view('basic.category')->message(__('message.success.200'))->data($categories)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }
}
