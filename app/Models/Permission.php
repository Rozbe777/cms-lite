<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Shanmuga\LaravelEntrust\Models\EntrustPermission;

/**
 * @method static parents()
 * @method static parentId($parentId)
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

}
