<?php


namespace App\Models\Repositories\Auth;


use App\Models\Role;
use App\Models\User;
use App\Models\VerifyMobile;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserModelRepository
{
    static public function findByMobile($mobile)
    {
        return User::firstWhere('mobile', $mobile);
    }

    public function findByID($id)
    {
        return User::findOrFail($id);
    }

    public function create($client)
    {
        $user = User::firstOrCreate(
            ["mobile" => $client->mobile,],
            [
                "mobile_verified_at" => Carbon::now(),
                "status" => "active"
            ]
        );

        if ($user->wasRecentlyCreated) {
            $role = Role::where('name', 'user')->first();
            $user->attachRole($role);
        }
        return $user;
    }

    public function createUser($mobile)
    {
        $client = new User([
            "mobile" => $mobile,
            "mobile_verified_at" => Carbon::now(),
            "status" => "deactivate"
        ]);
        $client->save();
        return $client;
    }

    public function update($data,$route = null)
    {
        try {
            /** find user by request->id */
            if (Auth::check())
                $user = Auth::user();
            else
                $user = User::whereId($data['id'])->first();

            unset($data['id'],$data['password_confirmation']);
            /** check submit the registration form with or without an image */
            if (isset($data['image'])) {
                $data['image'] = $data['image']->file('image')->store('public/images');
            } else {
                $data['image'] = 'defaultIMG.png';
            }
            if (!empty($data['password']))
                $data['password'] = bcrypt($data['password']);
            else
                unset($data['password']);

            if ($route != null && str_contains($route,'api'))
                $data['registration_source'] = 'api';

            $user->update($data);

            return $user;

        } catch (\Exception $exception) {
            return ['exception_message' => $exception->getMessage(), 'exception_code' => $exception->getCode()];
        }

    }
}
