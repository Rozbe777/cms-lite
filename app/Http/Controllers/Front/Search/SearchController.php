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

    public function search(Request $request)
    {
        $query = $request->input('query', "");
        if (empty($query))
            $query = "";
        $contents = $this->repository->search($query);
        return page('search', compact('contents', 'query'));
    }

}
