<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Shanmuga\LaravelEntrust\Models\EntrustPermission;

/**
 * @method static parents()
 * @method static parentId($parentId)
 * @property mixed children
 */
class Permission extends EntrustPermission
{
    use HasFactory;



    function scopeParents($query){
        return $query->whereParentId(0);
    }
    function scopeParentId($query, $parentId){
        return $query->whereParentId($parentId);
    }

    function getChildrenIdsAttribute(){
        foreach ($this->children as $child){
            $childrenIds[]=$child->id;
        }
        return json_encode($childrenIds);
    }

    function getChildrenMenuAttribute(){
        $childrenMenu=Permission::where([
            'is_menu'=>1,
            'parent_id'=>$this->id
        ])->get();

        return $childrenMenu;
    }
}
