<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attribute extends Model
{
    use HasFactory, SoftDeletes;

    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    protected $guarded = [];
    protected $appends = ['final_price'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function types()
    {
        return $this->hasMany(Type::class, 'attribute_id', 'id');
    }

    public function typeFeatures()
    {
        return $this->hasMany(TypeFeature::class, 'attribute_id', 'id');
    }

    public function orders()
    {
<<<<<<< HEAD
<<<<<<< HEAD
        return $this->morphToMany(Order::class, 'orderable');
=======
        return $this->belongsToMany(Order::class);
>>>>>>> c8a21951bbf17e245433eb55464ec9f4e5af0498
=======
        return $this->belongsToMany(Order::class);
    }

    public function getFinalPriceAttribute()
    {
        if ($this->attributes['discount_status'] == 'active') {
            return $this->attributes['discount'];
        } else {
            return $this->attributes['price'];
        }
>>>>>>> 116390efdca51c0ec4e8a8d4ab98153021d2c84f
    }
}
