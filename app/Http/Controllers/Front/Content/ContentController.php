<?php

namespace App\Http\Controllers\Front\Content;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Front\Page\FrontPageController;
use App\Models\Category;
use App\Models\Content;
use App\Models\Repositories\Front\FrontContentRepository;
use App\Models\Repositories\Front\FrontPageRepository;
use App\Models\Tag;

class ContentController extends Controller
{
    use ResponseTrait;

    protected FrontContentRepository $repository;

    public function __construct(FrontContentRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search($slug = null)
    {
        $content = $this->repository->search($slug);

        if ($content->owner == 'content') {
            $tags = Tag::orderBy('id', 'desc')->limit(10)->get();
            $categories = Category::moduleId(1)->orderBy('id', 'desc')->active()->limit(10)->get();
            return page('single-blog', compact('content', 'tags', 'categories'));
        } else {

            return (new FrontPageController(new FrontPageRepository()))->search($slug);
        }

    }
}
