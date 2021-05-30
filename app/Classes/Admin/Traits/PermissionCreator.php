<?php

namespace App\Classes\Admin\Traits;


use App\Models\Permission;

trait PermissionCreator
{

    public function permissionCreator($permissions)
    {
        foreach ($permissions as $record) {

            $permission = new Permission();
            $permission->name = $record["name"];
            if (!empty($record["weight"]))
                $permission->weight = $record["weight"];
            if (!empty($record["module_id"]))
                $permission->module_id = $record["module_id"];
            if (!empty($record["is_menu"]))
                $permission->is_menu = $record["is_menu"];
            if (!empty($record["icon"]))
                $permission->icon = $record["icon"];
            $permission->display_name = $record["display_name"];
            $permission->save();

            if (!empty($record['children'])) {
                foreach ($record['children'] as $child) {
                    $p = new Permission();
                    $p->name = $child["name"];
                    if (!empty($child["weight"]))
                        $p->weight = $child["weight"];
                    if (!empty($child["module_id"]))
                        $p->module_id = $child["module_id"];
                    $p->is_menu = $child["is_menu"];
                    $p->parent_id = $permission->id;
                    if (!empty($child["icon"]))
                        $p->icon = $child["icon"];
                    $p->display_name = $child["display_name"];
                    $p->save();
                }

            }
        }
    }

//    public function permissionCreator($permissions,$mapPermission,$mapPermissionPersian)
//    {
//        foreach ($permissions as $module => $values) {
//            $parentId = Permission::firstOrCreate([
//                'icon' => empty($values['icon'])?0:$values['icon'],
//                'name' => $module,
//                'display_name' => $values['display_name'],
//                'description' => $values['description'],
//                'is_menu' => empty($values['is_menu'])?0:1,
//            ])->id;
//            $is_menus = [];
//            if (!empty($values['is_menu']))
//                $is_menus = explode(',', $values['is_menu']);
//
//            foreach (explode(',', $values['access']) as $p => $perm) {
//                $permissionValue = $mapPermission->get($perm);
//                $permissionPersianValue = $mapPermissionPersian->get($perm);
//                $is_menu = !in_array($perm, $is_menus) ? 0 : 1;
//                $permissions[] = $parentId;
//                $permissions[] = Permission::firstOrCreate([
//                    'name' => $module . '.' . $permissionValue,
//                    'display_name' => ucfirst($permissionPersianValue) . ' ' . ucwords(str_replace('_', ' ', $values['display_name'])),
//                    'description' =>  ucwords(str_replace('_', ' ', $values['description'])),
//                    'parent_id' => $parentId,
//                    'is_menu' => $is_menu,
//
//                ])->id;
//
//                $this->command->info('Creating Permission to ' . $permissionValue . ' for ' . $module);
//            }
//            foreach ($values['children'] as $childrenModule => $childrenValues) {
//                $childParentId = Permission::firstOrCreate([
//                    'icon' => empty($childrenValues['icon'])?'':$childrenValues['icon'],
//                    'name' => $childrenModule,
//                    'display_name' => $childrenValues['display_name'],
//                    'description' => $childrenValues['description'],
//                    'is_menu' => empty($childrenValues['is_menu'])?0:1,
//                    'parent_id' => $parentId,
//
//                ])->id;
//                $is_menus = [];
//                if (!empty($childrenValues['is_menu']))
//                    $is_menus = explode(',', $childrenValues['is_menu']);
//
//                foreach (explode(',', $childrenValues['access']) as $p => $perm) {
//                    $permissionValue = $mapPermission->get($perm);
//                    $permissionPersianValue = $mapPermissionPersian->get($perm);
//                    $is_menu = !in_array($perm, $is_menus) ? 0 : 1;
//                    $permissions[] = $childParentId;
//                    $permissions[] = Permission::firstOrCreate([
//                        'name' => $childrenModule . '.' . $permissionValue,
//                        'display_name' => ucfirst($permissionPersianValue) . ' ' . ucwords(str_replace('_', ' ', $childrenValues['display_name'])),
//                        'description' =>  ucwords(str_replace('_', ' ', $childrenValues['description'])),
//                        'parent_id' => $childParentId,
//                        'is_menu' => $is_menu,
//
//                    ])->id;
//
//                    $this->command->info('Creating Permission to ' . $permissionValue . ' for ' . $module);
//                }
//
//            }
//
//        }

//    }

}
