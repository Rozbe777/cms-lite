<?php


namespace App\Repositories;


use App\Models\Permission;
use App\Models\Role;
use Illuminate\Support\Arr;

class RoleRepository
{

    public function all()
    {
        return Role::with('permissions')->get();
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        $rolePermissions = Arr::pluck($role->permissions, "id");
        $permissions = Permission::isParent()->get();
        foreach ($permissions as $p) {
            $children = Permission::parentId($p->id)->get();
            $p->children = $children;
        }
        return ['role'=>$role , "permissions" => $permissions , "rolePermissions" => $rolePermissions];
    }

    public function update(array $data, $id)
    {
        $data_permissions= $data['permissions'];
        unset($data['permissions'],$data['_method'],$data['_token']);
        $role = Role::where('id',$id)->update($data);
        $role = Role::with('permissions')->findOrFail($id);
        if (empty($data_permissions))
        {
            return $role->permissions()->sync([]);
        }
        $permissions = $data_permissions;
        return $role->permissions()->sync($permissions);
    }

    public function create(array $data)
    {
        unset($data['_token']);
        $role = Role::firstOrCreate(
            ['name' => $data['name']],
            ['display_name' => $data['display_name']],
        );
        $rolePermissions = $role->permissions;
        if ($rolePermissions->count() > 0 && !empty($data['permissions'])) {
            foreach ($rolePermissions as $id) {
                $permissions[] = $id->id;
            }
            foreach ($data['permissions'] as $index) {
                if (!in_array($index, $permissions))

                    $role->permissions()->attach($index);
            }
            return $this->all();
        }
        if (empty($data['permissions'])){
            $role->permissions()->sync([]);
            return $this->all();
        }
        $role->permissions()->sync($data['permissions']);
        return $this->all();
    }

    public function multipleDestroy(array $data)
    {
        return Role::whereIn('id', $data['roleId'])->delete();
    }
}
