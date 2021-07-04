<?php


namespace App\Models\Repositories\Admin;


use App\Models\Address;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use Illuminate\Support\Facades\Auth;

class AddressRepository implements RepositoryInterface
{

    public function all($userId=null,$search=null)
    {
        return Address::when(!empty($userId),function ($query) use ($userId){
            $query->whereIn('user_id',$userId);
        })->when(!empty($search),function ($query) use ($search) {
            $query->where('state','like','%'.$search.'%')
                ->where('city','like','%'.$search.'%')
                ->where('address','like','%'.$search.'%')
                ->where('postal_code','like','%'.$search.'%');
        })->orderByDesc('id')->get();
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($address)
    {
        return $address->delete();
    }

    public function update(array $data, $address)
    {
        return $address->update($data);
    }

    public function create(array $data)
    {
        if (empty($data['user_id']))
            $data['user_id'] = Auth::id();

        if (empty($data['postral_code']))
            unset($data['postral_code']);

         return Address::create($data);
    }

    public function multipleDestroy($data)
    {
        return Address::whereIn('id', $data['addressIds'])->delete();

    }
}
