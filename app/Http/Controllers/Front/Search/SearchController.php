<?php

namespace App\Http\Controllers\Front\Search;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $slug = $request->slug;

        $data = Content::with('tags')
            ->with('categories')
            ->with('user')
            ->with('viewCounts')
            ->when(!empty($slug), function ($query) use ($slug) {
                $query->where(function ($q) use ($slug){
                    $q->where('title', 'like', '%' . $slug . '%')
                        ->orWhere('slug', 'like', '%' . $slug . '%')
                        ->orWhere('content', 'like', '%' . $slug . '%');
                })->where('owner','content');
            })
            ->orderByDesc('id')->paginate(config('view.pagination'));

        return !empty($data) ?
            $this->view('content.show')->message(__('message.success.200'))->data($data)->success() :
            $this->view('index')->message(__('message.content.search.notSuccess'))->error();
    }

}
