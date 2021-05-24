<?php


namespace App\Repositories;


use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserRepository implements Interfaces\RepositoryInterface
{

    public function all()
    {
        try {
            return User::with('contents')
                ->with('tags')
                ->with('categories')
                ->where('status', "active")
                ->paginate(config('view.pagination'));
        } catch (\Exception $exception) {
            return [$exception->getCode(), $exception->getMessage()];
        }

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
