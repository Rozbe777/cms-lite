<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleChannel extends Model
{
    use HasFactory;


    function detail(){
        return $this->belongsToMany(ChannelDetail::class);
    }
    function scopeActive($query){
        return $query->where('status','active');
    }
}
