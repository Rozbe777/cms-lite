<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    const TRANSACTION_TYPE_ONLINE_PAY = 1;
    use HasFactory;

    protected $fillable = ['user_id', 'amount', 'transaction_type_id', 'payload', 'description'];
}
