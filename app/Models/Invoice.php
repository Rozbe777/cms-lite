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

    public function products()
    {
        return $this->belongsToMany(Product::class, 'invoice_products', 'invoice_id','product_id');
    }

}
