<?php

namespace App\Http\Controllers\Admin\Category\Helper;

use App\Models\Category;

class CategorySearchHelper
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

    public function searchCategories()
    {
        $category = Category::where('name', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')
            ->paginate(12);

        $data = $category->filter(function ($item,$key){
            if ($this->status){
                return data_get($item, 'status') == $this->status;
            }else{
                return $item;
            }
        });

        return $data;
    }
}
