<?php


namespace App\Repositories\AbstractFac;


abstract class CrudFactory
{
    abstract public function all();
    abstract public function create(array $data);
    abstract public function edit($id);
    abstract public function update(array $data, $id);
    abstract public function multipleDestroy(array $data);
}
