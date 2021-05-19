<?php

namespace App\Http\Controllers\Admin\User\Helper;

use App\Models\Role;
use App\Models\User;

class UserSearchHelper
{
    private $confirmed = null;
    private $role = null;
    private $status = null;
    private $search = null;


    public function __construct($request)
    {

        if (isset($request->confirmed))
            $this->confirmed = $request->confirmed;
        if (isset($request->role))
            $this->role = $request->role;
        if (isset($request->status))
            $this->status = $request->status;
        if (isset($request->search))
            $this->search = $request->search;

    }

    public function searchAndRoleUsers()
    {
        if (!($this->role === null)) {
            return Role::where('name', $this->role)->first()->users()->where('name', 'like', '%' . $this->search . '%')
                ->orWhere('last_name', 'like', '%' . $this->search . '%')
                ->orWhere('email', 'like', '%' . $this->search . '%')
                ->orWhere('phone', 'like', '%' . $this->search . '%')->paginate(12);
        }

        return User::where('name', 'like', '%' . $this->search . '%')
            ->orWhere('last_name', 'like', '%' . $this->search . '%')
            ->orWhere('email', 'like', '%' . $this->search . '%')
            ->orWhere('phone', 'like', '%' . $this->search . '%')->paginate(12);

    }

    public function confirmedUsers($users)
    {
        if (!($this->confirmed === null)) {
            if ($this->confirmed == 1)
                $users = $users->whereNotNull('email_verified_at');

            $users = $users->whereNull('email_verified_at');

        }

        return $users;

    }

    public function statusUsers($users)
    {
        if (!($this->status === null))
            $users = $users->where('status', $this->status);

        return $users;
    }


}
