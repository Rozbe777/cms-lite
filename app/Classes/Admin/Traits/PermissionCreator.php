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

}
