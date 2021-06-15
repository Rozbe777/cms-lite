<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attribute extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded = [];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'attribute_product', 'attribute_id', 'product_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function types()
    {
        return $this->hasMany(Type::class, 'attribute_id','id');
    }

    public function typeFeatures()
    {
        return $this->hasMany(TypeFeature::class, 'attribute_id', 'id');
    }
}
