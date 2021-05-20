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
        $user = VerifyMobile::where('mobile', $mobile)->first();
        return $user;
    }

    public function findByID($id)
    {
        return User::findOrFail($id);
    }

    public function createClient($mobile)
    {
        $client = new VerifyMobile([
            "mobile" => $mobile
        ]);
        $client->save();
        return $client;
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

            if ($user->status != "active")
                return ['exception_message'=>"user mobile is not active",'exception_code'=>404];

            /** check submit the registration form with or without an image */
            if ($request->avatar) {
                $data = $request->only(['name', 'last_name', 'email']);
                $data['avatar'] = $request->file('img')->store('public');

            } else {
                $data = $request->only(['name', 'last_name', 'email']);
                $data['avatar'] = 'public/defaultIMG.png';

            }
            $data['password'] = bcrypt($request->password);

            $user->update($data);
            (new SmsRepository())->deleteToken($user->id);

            return $user;

        } catch (\Exception $exception){
            return ['exception_message'=>$exception->getMessage(),'exception_code'=>$exception->getCode()];
        }

    }
}
