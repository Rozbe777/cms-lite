<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProducts extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function invoices()
    {
        return $this->belongsTo(Invoice::class);
    }
}
