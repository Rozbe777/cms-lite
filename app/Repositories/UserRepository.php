<?php


namespace App\Repositories;


use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserRepository implements Interfaces\RepositoryInterface
{

    public function all($role = null, $status = null, $search = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        if (empty($status))
            $status = 'active';

        return User::when($search != null, function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('last_name', 'like', '%' . $search . '%')
                ->orWhere('mobile', 'like', '%' . $search . '%');
        })->when($role != null, function ($query) use ($role) {
            $query->whereHas('roles', function ($query) use ($role) {
                $query->where("role_id", $role);
            });
        })->where('status', $status)
            ->paginate($pageSize);
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($user)
    {
        return $user->delete();
    }

    public function update(array $data, $user)
    {
        if (array_key_exists('role_id',$data)){
            $role = Role::findOrFail($data['role_id']);
            $user->detachRoles();
            $user->attachRole($role);
            unset($data['role_id']);
        }
        $user->update($data);
        return $user;
    }

    public function create(array $data)
    {
        if (array_key_exists('role_id',$data)){
            $role = Role::findOrFail($data['role_id']);
            unset($data['role_id']);
        }
        $user = User::create($data);
        $user->attachRole($role);
        $user->save();
        return $user;
    }

    public function multipleDestroy($data)
    {
        User::whereIn('id', $data['userIds'])->delete();
        return true;
    }
}
