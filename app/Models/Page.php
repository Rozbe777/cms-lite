<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    protected $table = "contents";
    use HasFactory, SoftDeletes;

    protected $guarded=[];


    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function viewCounts()
    {
        return $this->morphOne(ViewCount::class,'viewcountable');
    }

    function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
