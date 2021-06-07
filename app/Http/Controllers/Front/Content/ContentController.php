<?php

namespace App\Http\Controllers\Front\Content;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Repositories\Front\FrontContentRepository;

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
        $contents = $this->repository->search($slug);

        return !empty($contents) ?
            $this->view('basic.content')->message(__('message.success.200'))->data($contents)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }
}
