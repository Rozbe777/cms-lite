<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use HasFactory , SoftDeletes;

    protected $guarded = [];

    public function orders()
    {
        return $this->belongsTo(Order::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProducts::class,"invoices_id","id");
    }
}
