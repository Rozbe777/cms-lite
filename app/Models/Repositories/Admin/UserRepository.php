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
            $query->whereHas('roles',function ($q) use ($role) {
                $q->where('role_id',$role);
            });
        })->when($status != null, function ($query) use ($status) {
            $query->where('status', $status);
        })->orderByDesc('id')->
            paginate(config('view.pagination'));
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
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
            unset($data['password_confirmation']);
        }

        if (array_key_exists('role_id', $data)) {
            $role = Role::findOrFail($data['role_id']);
            $user->detachRoles();
            $user->attachRole($role);
            unset($data['role_id']);
        }
        if (!empty($data['avatar']))
            $data['avatar'] = $this->imageHandler($data['avatar']);

        $user->update($data);
        return $user;
    }

    public function create(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        if (array_key_exists('role_id', $data)) {
            $role = Role::findOrFail($data['role_id']);
            unset($data['role_id'], $data['password_confirmation']);
        }
        if (!empty($data['avatar']))
            $data['avatar'] = $this->imageHandler($data['avatar']);

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
