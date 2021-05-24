<?php


namespace App\Repositories\Interfaces;


interface RepositoryInterface
{
    public function all();

    public function get($id);

    public function delete($id);

    public function update(array $data,$id);

    public function create(array $data);
}
