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
        /** Initialization search parameters */
        if (isset($request->role))
            $this->role = $request->role;
        if (isset($request->status))
            $this->status = $request->status;
        if (isset($request->search))
            $this->search = $request->search;
    }

    public function searchUser()
    {
        $user = User::where('last_name', 'like', '%' . $this->search . '%')
            ->orWhere('name', 'like', '%' . $this->search . '%')
            ->orWhere('email', 'like', '%' . $this->search . '%')
            ->orWhere('phone', 'like', '%' . $this->search . '%')
            ->with()
            ->paginate(config('view.pagination'));

        $data = $user->filter(function ($item,$key){
            if ($this->role){
                return data_get($item, 'role') == $this->role;
            }else{
                return $item;
            }
        })->filter(function ($item){
            if ($this->status){
                return data_get($item, 'status') == $this->status;
            }else{
                return $item;
            }
        });

        return $data;
    }


}
