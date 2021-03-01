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

        foreach ($config as $key => $modules) {

            // Create a new role
            $role = \App\Models\Role::create([
                'name' => $key,
                'display_name' => ucwords(str_replace('_', ' ', $key)),
                'description' => ucwords(str_replace('_', ' ', $key))
            ]);
            $permissions = [];

            $this->command->info('Creating Role '. strtoupper($key));

            // Reading role permission modules
            foreach ($modules as $module => $values) {
                $parentId = Permission::firstOrCreate([
                    'name' => $module ,
                    'display_name' => $values['display_name'],
                    'description' => $module,
                    'is_menu'=>1

                ])->id;

                foreach (explode(',', $values['access']) as $p => $perm) {

                    $permissionValue = $mapPermission->get($perm);
                    $permissionPersianValue = $mapPermissionPersian->get($perm);


                    $permissions[] =$parentId;
                    $permissions[] = Permission::firstOrCreate([
                        'name' => $module . '.' . $permissionValue ,
                        'display_name' => ucfirst($permissionPersianValue) . ' ' . ucwords(str_replace('_', ' ', $values['display_name'])),
                        'description' => ucfirst($permissionValue) . ' ' . ucwords(str_replace('_', ' ', $module)),
                        'parent_id'=>$parentId,
                        'is_menu'=>0
                        ])->id;

                    $this->command->info('Creating Permission to '.$permissionValue.' for '. $module);
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
