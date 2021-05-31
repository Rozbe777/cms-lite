<?php

namespace App\Http\Controllers\Admin\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Profile\PasswordRequest;
use App\Http\Requests\Admin\Profile\UpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    function index()
    {
        $user = Auth::user();
        return adminView('pages.admin.profile.index', compact('user'));
    }

    function update(UpdateRequest $request)
    {
        $data = $request->all();
        $user = Auth::user();

            $data['mobile'] = !empty($data['mobile'])?
                $data['mobile'] :
                $user->mobile;
        $name = $request->input('name');
        $lastName = $request->input('last_name');
        $email = $request->input('email');
        $mobile = mobile($request->input('mobile'));

        $user = User::find(auth()->id());
        $user->name = $name;
        $user->last_name = $lastName;
        $user->email = $email;
        $user->mobile = $mobile;
        $user->save();
        return success(['user' => $user], 'تغییرات با موفقیت ثبت شد.');
    }

    function changePassword(PasswordRequest $request)
    {
        $currentPassword = $request->input('current_password');
        $user = User::find(auth()->id());
        if (!Hash::check($currentPassword, $user->password)) {
            return error('رمز عبور فعلی نامعتبر است.');
        }
        $password = convertDigit($request->input('password'));

        $confirmPassword = convertDigit($request->input('password_confirmation'));;
        if ($password != $confirmPassword) {
            return error('رمز عبور با تکراررمز عبور یکسان نیست!');
        }
        $user->password = bcrypt($password);
        $user->save();
        return success([], 'رمزعبور جدید ثبت شد.');
    }
}
