<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Shanmuga\LaravelEntrust\Models\EntrustPermission;

/**
 * @method static isPrent()
 * @method static isMenu()
 * @method static parentId($parentId)
 * @property mixed children
 */
class Permission extends EntrustPermission
{
    use HasFactory;


    function scopeIsParent($query)
    {
        return $query->whereParentId(0);
    }

    function scopeIsMenu($query)
    {
        return $query->whereParentId(0);
    }

    function scopeParentId($query, $parentId)
    {
        return $query->whereParentId($parentId);
    }


}
