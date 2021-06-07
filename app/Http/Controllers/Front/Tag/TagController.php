<?php

namespace App\Http\Controllers\Front\Tag;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Repositories\Front\FrontTagRepository;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    use ResponseTrait;

    protected FrontTagRepository $repository;

    public function __construct(FrontTagRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search($slug = null)
    {
        $tags = $this->repository->search($slug);

        return !empty($tags) ?
            $this->view('content.show')->message(__('message.success.200'))->data($tags)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }
}
