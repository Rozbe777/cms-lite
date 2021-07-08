<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CouponSetting extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function coupons()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function scopeExpired($query)
    {
        return $query->where('end_date','>',jdate()->getTimestamp())->get();
    }
}
