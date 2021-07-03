<?php


namespace App\Models\Repositories\Front;


use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;

class FrontOrderRepository implements RepositoryInterface
{

    /**
     * @return mixed
     */
    public function all($status =null ,$userId =null , $price = null, $date = null)
    {

    }

    /**
     * @param $id
     * @return mixed
     */
    public function get($id)
    {
        // TODO: Implement get() method.
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    /**
     * @param array $data
     * @param $id
     * @return mixed
     */
    public function update(array $data, $id)
    {
        // TODO: Implement update() method.
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        // TODO: Implement create() method.
    }
}
