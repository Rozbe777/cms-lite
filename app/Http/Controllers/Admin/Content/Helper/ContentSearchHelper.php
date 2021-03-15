<?php


use App\Models\Content;

class ContentSearchHelper
{
    private $owner = null;
    private $comment_status = null;
    private $status = null;
    private $search = null;


    public function __construct($request)
    {

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


        return Content::where('title', 'like', '%' . $this->search . '%')
            ->orWhere('slug', 'like', '%' . $this->search . '%')
            ->orWhere('content', 'like', '%' . $this->search . '%')->paginate(12);

    }

    public function ownerContents($contents)
    {
        if (!($this->owner === null))
            $contents = $contents->where('owner', $this->owner);

        return $contents;
    }

    public function commentStatusContents($contents)
    {
        if (!($this->comment_status === null))
            $contents = $contents->where('comment_status', $this->comment_status);

        return $contents;
    }

    public function statusContents($contents)
    {
        if (!($this->status === null))
            $contents = $contents->where('status', $this->status);

        return $contents;
    }
}
