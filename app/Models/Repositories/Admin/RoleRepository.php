<?php


namespace App\Models\Repositories\Admin;


use App\Models\Permission;
use App\Models\Repositories\Admin\Interfaces\RepositoryInterface;
use App\Models\Role;
use Illuminate\Support\Arr;

class RoleRepository implements RepositoryInterface
{
    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return Role::with('permissions')->get();
    }

    /**
     * @param $id
     * @return array
     */
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

    /**
     * @param array $data
     * @param $id
     * @return mixed
     */
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

    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
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

    /**
     * @param $id
     * @return mixed
     */
    public function multipleDestroy($id)
    {
        return Role::where('id',$id)->delete();
    }

    /**
     * @param $id
     */
    public function get($id)
    {
        // TODO: Implement get() method.
    }

    /**
     * @param $id
     */
    public function delete($id)
    {
        // TODO: Implement delete() method.
    }
}
