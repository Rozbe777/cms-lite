<?php


namespace App\Repositories;


use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserRepository implements Interfaces\RepositoryInterface
{

    public function all($role = [], $status = 'active', $search = [], $pageSize = [])
    {
        if (empty($pageSize)) {
            $pageSize = config('view.pagination');
        }
        return User::where(function ($query) use ($search) {
            return $query->when($search != null, function ($query) use ($search) {
                return $query->where('last_name', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        })
            ->where('status', "active")
            ->whereHas('roles', function ($query) use ($role) {
                return $query->where('name', $role);
            })
            ->paginate(config('view.pagination'));
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($user)
    {
        $user->update(['status' => 'deactivate']);
        return $user->delete();
    }

    public function update(array $data, $user)
    {
        return $user->update($data);
    }

    public function create(array $data)
    {
        return User::create($data);
    }

    public function multipleDestroy($data)
    {
        User::whereIn('id', $data['users'])->update(['status' => 'deactivate', "deleted_at" => Carbon::now()]);
        return true;
    }
}
