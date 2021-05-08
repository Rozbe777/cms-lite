<?php


namespace App\Repositories;


use App\Models\Content;
use Carbon\Carbon;

class ContentRepository implements Interfaces\RepositoryInterface
{

    public function all()
    {
        return Content::with('user')->with('tags')->with('categories')->where('published_at','<=', Carbon::now())->get();
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    public function update(array $data, $id)
    {
        // TODO: Implement update() method.
    }

    public function create(array $data)
    {
        // TODO: Implement create() method.
    }
}
