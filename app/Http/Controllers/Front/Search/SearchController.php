<?php

namespace App\Http\Controllers\Front\Search;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Models\Content;
use App\Models\Repositories\Front\FrontSearchRepository;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    use ResponseTrait;

    protected $repository;

    public function __construct(FrontSearchRepository $repository)
    {
        $this->repository = $repository;
    }

    public function search(SearchRequest $request)
    {
        $data = $this->repository->search($request->slug);

        return !empty($data) ?
            $this->view('basic.index')->message(__('message.success.200'))->data($data)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }

}
