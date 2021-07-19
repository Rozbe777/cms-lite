<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeFeature extends Model
{
    use HasFactory, SoftDeletes;
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    protected $guarded = [];

    public function attributes()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
}
