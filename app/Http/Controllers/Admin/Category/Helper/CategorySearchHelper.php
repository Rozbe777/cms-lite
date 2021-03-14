<?php


use App\Models\Category;

class CategorySearchHelper
{

    private $search = null;
    private $status = null;


    public function __construct($request)
    {

        if (isset($request->search))
            $this->search = $request->search;

        if (isset($request->status))
            $this->status = $request->status;
    }

    public function searchCategories()
    {


        return Category::where('name', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')
            ->orWhere('description', 'like', '%' . $this->search . '%')->paginate(12);

    }

    public function statusCategory($categories)
    {
        if (!($this->status === null))
            $categories = $categories->where('status', $this->status);

        return $categories;
    }
}
