<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Shanmuga\LaravelEntrust\Models\EntrustRole;

/**
 * @property string name
 * @property string display_name
 * @method static paginate(int $int)
 * @method static findOrFail($id)
 */
class Role extends EntrustRole
{
    use HasFactory;

protected $guarded = [];

    public function permissions(){
        return $this->belongsToMany(Permission::class);
    }
    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function getPersianNameAttribute()
    {
        if ($this->attributes['name']=='admin')
        $persianName='ادمین';
        return $this->attributes['name'] =='admin'?'فعال':'بسته شده';
    }
}
