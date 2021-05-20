<?php


namespace App\Models\Repositories\Auth;


use App\Models\User;
use App\Models\VerifyMobile;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserModelRepository
{
    public function findByMobile($mobile)
    {
        $user = User::where('mobile', $mobile)->first();
        return $user;
    }

    public function findByID($id)
    {
        return User::findOrFail($id);
    }

    public function create($client)
    {
        $user= User::firstOrCreate(
        ["mobile" => $client->mobile,],
        ["mobile_verified_at"=> $client->updated_at,]
        );

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

    public function update($request)
    {
        try {
            /** find user by request->id */
            $user = $this->findById($request->id);

            /** check submit the registration form with or without an image */
            if ($request->avatar) {
                $data = $request->only(['name', 'last_name', 'email']);
                $data['avatar'] = $request->file('img')->store('public');

            } else {
                $data = $request->only(['name', 'last_name', 'email']);
                $data['avatar'] = 'public/defaultIMG.png';
            }
            $data['password'] = bcrypt($request->password);
            $data['status'] = 'active';

            $user->update($data);

            return $user;

        } catch (\Exception $exception){
            return ['exception_message'=>$exception->getMessage(),'exception_code'=>$exception->getCode()];
        }

    }
}
