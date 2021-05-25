<?php


namespace App\Repositories;


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
        })->where('status', $status)
            ->paginate($pageSize);

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
