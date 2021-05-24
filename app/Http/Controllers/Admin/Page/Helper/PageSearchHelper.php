<?php


namespace App\Http\Controllers\Admin\Page\Helper;


use App\Models\Page;

class PageSearchHelper
{
    private $comment_status = null;
    private $status = null;
    private $search = null;


    public function __construct($request)
    {
        /** Initialization search parameters */
        if (isset($request->comment_status))
            $this->comment_status = $request->comment_status;

        if (isset($request->status))
            $this->status = $request->status;

        if (isset($request->search))
            $this->search = $request->search;
    }

    public function searchPages()
    {
        $page = Page::where('title', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')
            ->orWhere('content', 'like', '%' . $this->search . '%')
            ->paginate(12);

        $data = $page->filter(function ($item,$key){
            if ($this->comment_status){
                return data_get($item, 'comment_status') == $this->comment_status;
            }else{
                return $item;
            }
        })->filter(function ($item){
            if ($this->status){
                return data_get($item, 'status') == $this->status;
            }else{
                return $item;
            }
        });

        return $data;
    }
}
