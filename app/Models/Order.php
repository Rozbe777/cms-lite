<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded =[];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function coupons()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function invoices()
    {
        return $this->morphedByMany(Invoice::class, 'orderable');
    }

    public function products()
    {
        return $this->morphedByMany(Product::class, 'orderable');
    }

    public function types()
    {
        return $this->morphedByMany(Type::class, 'orderable');
    }

    public function typeFeatures()
    {
        return $this->morphedByMany(TypeFeature::class, 'orderable');
    }

    public function attributes()
    {
        return $this->morphedByMany(Attribute::class, 'orderable');
    }
 }
