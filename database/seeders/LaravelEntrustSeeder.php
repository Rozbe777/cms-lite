<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class LaravelEntrustSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return  void
     */
    public function run()
    {
        $this->command->info('Truncating Roles, Permissions and Users tables');
        $this->truncateEntrustTables();

        $config = config('entrust_seeder.role_structure');
        $userRoles = config('entrust_seeder.user_roles');
        $mapPermission = collect(config('entrust_seeder.permissions_map'));
        $mapPermissionPersian = collect(config('entrust_seeder.permissions_map_persian'));
        $mapRolePersian = collect(config('entrust_seeder.role_map_persian'));

        foreach ($config as $key => $modules) {
            $rolePersianValue = $mapRolePersian->get($key);

            // Create a new role
            $role = \App\Models\Role::create([
                'name' => $key,
                'display_name' => $rolePersianValue,
                'description' => $rolePersianValue
            ]);
            $permissions = [];

            $this->command->info('Creating Role '. strtoupper($key));
//            $parentWeight=0;
            // Reading role permission modules
            foreach ($modules as $module => $values) {
                $parentId = Permission::firstOrCreate([
                    'name' => $module ,
                    'display_name' => $values['display_name'],
                    'description' => $values['description'],
                    'is_menu'=>1,
//                    'weight'=>$parentWeight  TODO //vaghti weight mizarim Duplicate pish miad tozih dare
                ])->id;
//                $parentWeight++;
                $is_menus=explode(',',$values['is_menu']);

                foreach (explode(',', $values['access']) as $p => $perm) {
//                    $childWeight=0;
                    $permissionValue = $mapPermission->get($perm);
                    $permissionPersianValue = $mapPermissionPersian->get($perm);
                    $is_menu= !in_array($perm,$is_menus) ?0:1;
                    $permissions[] =$parentId;
                    $permissions[] = Permission::firstOrCreate([
                        'name' => $module . '.' . $permissionValue ,
                        'display_name' => ucfirst($permissionPersianValue) . ' ' . ucwords(str_replace('_', ' ', $values['display_name'])),
                        'description' => ucfirst($values['description']) . ' ' . ucwords(str_replace('_', ' ', $values['description'])),
                        'parent_id'=>$parentId,
                        'is_menu'=>$is_menu,
//                        'weight'=>$childWeight

                    ])->id;
//                    $childWeight++;

                    $this->command->info('Creating Permission to '.$permissionValue.' for '. $module);
                }
                foreach($values['children'] as $childrenModule => $childrenValues){
                    $childParentId = Permission::firstOrCreate([
                        'name' => $childrenModule ,
                        'display_name' => $childrenValues['display_name'],
                        'description' => $childrenValues['description'],
                        'is_menu'=>1,
                        'parent_id'=>$parentId,

//                    'weight'=>$parentWeight  TODO //vaghti weight mizarim Duplicate pish miad tozih dare
                    ])->id;
//                $parentWeight++;
                    $is_menus=explode(',',$childrenValues['is_menu']);

                    foreach (explode(',', $childrenValues['access']) as $p => $perm) {
//                    $childWeight=0;
                        $permissionValue = $mapPermission->get($perm);
                        $permissionPersianValue = $mapPermissionPersian->get($perm);
                        $is_menu= !in_array($perm,$is_menus) ?0:1;
                        $permissions[] =$childParentId;
                        $permissions[] = Permission::firstOrCreate([
                            'name' => $childrenModule . '.' . $permissionValue ,
                            'display_name' => ucfirst($permissionPersianValue) . ' ' . ucwords(str_replace('_', ' ', $childrenValues['display_name'])),
                            'description' => ucfirst($childrenValues['description']) . ' ' . ucwords(str_replace('_', ' ', $childrenValues['description'])),
                            'parent_id'=>$childParentId,
                            'is_menu'=>$is_menu,
//                        'weight'=>$childWeight

                        ])->id;
//                    $childWeight++;

                        $this->command->info('Creating Permission to '.$permissionValue.' for '. $module);
                    }

                }

            }

            // Attach all permissions to the role
            $role->permissions()->sync($permissions);

            if(isset($userRoles[$key])) {
                $this->command->info("Creating '{$key}' users");

                $role_users  = $userRoles[$key];

                foreach ($role_users as $role_user) {
                    if(isset($role_user["password"])) {
                        $role_user["password"] = Hash::make($role_user["password"]);
                    }
                    $user = \App\Models\User::create($role_user);
                    $user->attachRole($role);
                }

            }
        }
    }

    /**
     * Truncates all the entrust tables and the users table
     *
     * @return    void
     */
    public function truncateEntrustTables()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permission_role')->truncate();
        DB::table('role_user')->truncate();
        DB::table('users')->truncate();

        \App\Models\Role::truncate();
        Permission::truncate();

        Schema::enableForeignKeyConstraints();
    }
}
