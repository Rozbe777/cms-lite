<?php


use App\Models\Tag;

class TagSearchHelper
{
    private $search = null;


    public function __construct($request)
    {

        if (isset($request->search))
            $this->search = $request->search;

    }

    public function searchTags()
    {


        return Tag::where('name', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')->paginate(12);

    }


}
