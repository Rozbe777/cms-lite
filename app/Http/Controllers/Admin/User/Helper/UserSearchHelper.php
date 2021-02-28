<?php

namespace App\Http\Controllers\Admin\User\Helper;

use App\Models\Role;
use App\Models\User;

class UserSearchHelper
{
    private $confirmed = null;
    private $role = null;
    private $status = null;


    public function __construct($request)
    {
        if (isset($request->confirmed))
            $this->confirmed = $request->confirmed;
        if (isset($request->role))
            $this->role = $request->role;
        if (isset($request->status))
            $this->status = $request->status;


    }

    public function roleUsers()
    {
        if (!($this->role === null)) {
            return Role::where('name', $this->role)->first()->users()->get();
        }
        return User::all();

    }

    public function confirmedUsers($users)
    {
        if (!($this->confirmed === null))
            $users = $users->whereNotNull('email_verified_at');

        return $users;

    }

    public function statusUsers($users)
    {
        if (!($this->status === null))
            $users = $users->where('status', $this->status);

        return $users;

    }





}
