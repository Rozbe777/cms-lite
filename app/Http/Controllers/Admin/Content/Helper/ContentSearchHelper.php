<?php

namespace App\Http\Controllers\Admin\Content\Helper;

use App\Models\Content;

class ContentSearchHelper
{
    private $owner = null;
    private $comment_status = null;
    private $status = null;
    private $search = null;


    public function __construct($request)
    {
        /** Initialization search parameters */
        if (isset($request->owner))
            $this->owner = $request->owner;

        if (isset($request->comment_status))
            $this->comment_status = $request->comment_status;

        if (isset($request->status))
            $this->status = $request->status;

        if (isset($request->search))
            $this->search = $request->search;

    }

    public function searchContents()
    {
        $content = Content::where('title', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')
            ->orWhere('content', 'like', '%' . $this->search . '%')->paginate(12);

        $data = $content->filter(function ($item,$key){
            if ($this->owner){
                return data_get($item, 'owner') == $this->owner;
            }else{
                return $item;
            }
        })->filter(function ($item){
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
