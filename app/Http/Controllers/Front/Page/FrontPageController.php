<?php

namespace App\Http\Controllers\Front\Page;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Repositories\Front\FrontContentRepository;
use App\Models\Repositories\Front\FrontPageRepository;

class FrontPageController extends Controller
{
    use ResponseTrait;

    protected FrontPageRepository $repository;

    public function __construct(FrontPageRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search($slug = null)
    {
        $contents = $this->repository->search($slug);

        return !empty($contents) ?
            $this->view('basic.page')->message(__('message.success.200'))->data($contents)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }
}
