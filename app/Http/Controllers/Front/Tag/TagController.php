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
        $tag = $this->repository->search($slug);
        $contents = $tag->contents()->orderByDesc('id')->paginate(config('view.pagination'));
        return page('tag',compact('tag','contents'));
    }
}
