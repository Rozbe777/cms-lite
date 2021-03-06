<?php


namespace App\Models\Repositories\Admin;


use App\Http\Controllers\Admin\User\Traits\UserTrait;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;

class UserRepository implements RepositoryInterface
{
    use UserTrait;

    public function all($role = null, $status = null, $search = null, $pageSize = null)
    {
        if (empty($pageSize))
            $pageSize = config('view.pagination');

        return User::when($search != null, function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('last_name', 'like', '%' . $search . '%')
                ->orWhere('mobile', 'like', '%' . $search . '%');
        })->when($role != null, function ($query) use ($role) {
            $query->whereHas('roles', function ($q) use ($role) {
                $q->where('role_id', $role);
            });
        })->when($status != null, function ($query) use ($status) {
            $query->where('status', $status);
        })->with('addresses')
            ->orderByDesc('id')
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

    public function update(array $data, $userId)
    {
        $user = User::find($userId);

        if (!empty($data['password']))
            $data['password'] = bcrypt($data['password']);
        else
            unset($data['password_confirmation']);

        if (array_key_exists('role_id', $data)) {
            $role = Role::findOrFail($data['role_id']);
            $user->detachRoles();
            $user->attachRole($role);
            unset($data['role_id']);
        }
        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        $user->update($data);
        return $user;
    }

    public function create(array $data)
    {
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

            $role = Role::find(2);

        unset($data['password_confirmation']);

        if (!empty($data['image']))
            $data['image'] = $this->imageHandler($data['image']);
        else
            unset($data['image']);

        $user = User::create($data);
        $user->attachRole($role);
        $user->save();
        return $user;
    }

    public function multipleDestroy($data)
    {
        return User::whereIn('id', $data['userIds'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
    }
}
