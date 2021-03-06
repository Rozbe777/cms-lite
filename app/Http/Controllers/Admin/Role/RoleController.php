<?php

namespace App\Http\Controllers\Admin\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Role\CreateRoleRequest;
use App\Http\Requests\Admin\Role\EditRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Arr;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::paginate(12);
        return adminView("pages.admin.role.index", compact("roles"));
    }

    public function create()
    {
        $permissions = Permission::parents()->get();
        foreach ($permissions as $p) {
            $children = Permission::parentId($p->id)->get();
            $p->children = $children;
        }
        return adminView("pages.admin.role.create", compact("permissions"));
    }

    public function store(CreateRoleRequest $request)
    {
        $role = new Role();
        $role->name = $request->input('name');
        $role->display_name = $request->input('display_name');
        $role->save();
        $role->permissions()->attach($request->input('permissions'));
        return redirect(route("admin.role.index"))->with("info", "عملیات افزودن دسترسی جدید موفقیت انجام شد");
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        $rolePermissions = Arr::pluck($role->permissions, "id");
        $permissions = Permission::parents()->get();
        foreach ($permissions as $p) {
            $children = Permission::parentId($p->id)->get();
            $p->children = $children;
        }
        return adminView("pages.admin.role.edit", compact("role", "permissions", "rolePermissions"));
    }

    public function update(EditRoleRequest $request, $id)
    {
        $role = Role::findOrFail($id);
        $role->name = $request->input('name');
        $role->display_name = $request->input('display_name');
        $role->save();
        $role->permissions()->sync($request->input('permissions'));
        return redirect(route("admin.role.index"))->with("info", "عملیات ویرایش دسترسی با موفقیت انجام شد");

    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return redirect(route("admin.role.index"))->with("info", "عملیات حذف دسترسی با موفقیت انجام شد");
    }
}
