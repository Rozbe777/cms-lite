<?php

namespace App\Http\Controllers\Front\Content;

use App\Classes\Responses\Front\ResponseTrait;
use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    use ResponseTrait;

    public function show($slug)
    {
        $content = Content::where('slug', $slug)->with('tags')->with('categories')->with('user')->with('viewCounts')->get();

        return $this->view('content.show')->message(__('message.success.200'))->data($content)->success();
    }

    public function list()
    {

    }

    public function search()
    {

    }
}
