<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChannelDetail extends Model
{
    use HasFactory;
    function scopeActive($query){
        return $query->where('status','active');
    }

    function channel(){
        return $this->belongsTo(SaleChannel::class,'sale_channel_id','id');
    }
}
