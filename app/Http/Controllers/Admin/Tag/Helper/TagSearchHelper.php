<?php

namespace App\Http\Controllers\Admin\Tag\Helper;

use App\Models\Tag;

class TagSearchHelper
{
    private $search = null;
    private $status = null;

    public function __construct($request)
    {
        /** Initialization search parameters */
        if (isset($request->search))
            $this->search = $request->search;

        if (isset($request->status))
            $this->status = $request->status;
    }

    public function searchTags()
    {
        $tag = Tag::where('name', 'like', '%' . $this->search . '%')
            ->paginate(12);

        $data = $tag->filter(function ($item){
            if ($this->status){
                return data_get($item, 'status') == $this->status;
            }else{
                return $item;
            }
        });

        return $data;
    }
}
