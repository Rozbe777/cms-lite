<?php


namespace App\Models\Repositories\Admin;


use App\Models\Address;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AddressRepository implements RepositoryInterface
{

    /**
     * @param null $userId
     * @param null $search
     * @return mixed
     */
    public function all($userId = null, $search = null)
    {
        return Address::when(!empty($userId), function ($query) use ($userId) {
            $query->whereIn('user_id', $userId);
        })->when(!empty($search), function ($query) use ($search) {
            $query->where('state', 'like', '%' . $search . '%')
                ->where('city', 'like', '%' . $search . '%')
                ->where('address', 'like', '%' . $search . '%')
                ->where('postal_code', 'like', '%' . $search . '%');
        })->orderByDesc('id')->get();
    }

    /**
     * @param $address
     * @return mixed
     */
    public function delete($address)
    {
    }

    /**
     * @param array $data
     * @param $address
     * @return mixed
     */
    public function update(array $data, $address)
    {
        if (empty($data['state']))
            unset($data['state']);

        if (empty($data['city']))
            unset($data['city']);

        if (empty($data['address']))
            unset($data['address']);

        if (empty($data['postal_code']))
            unset($data['postal_code']);

        return $address->update($data);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        if (empty($data['user_id']))
            $data['user_id'] = Auth::id();

        if (empty($data['postral_code']))
            unset($data['postral_code']);

        return Address::create($data);
    }

    /**
     * @param $data
     * @return mixed
     */
    public function multipleDestroy($data)
    {
        return Address::whereIn('id', $data['addressesId'])->delete();
    }

    /**
     * @param $id
     */
    public function get($id)
    {
    }

}
