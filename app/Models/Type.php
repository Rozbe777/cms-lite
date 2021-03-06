<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Type extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function attributes()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function typeFeatures()
    {
        return $this->hasMany(TypeFeature::class,'type_id','id');
    }
}
