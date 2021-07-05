<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentItem extends Model
{
    use HasFactory;

    public function getPayloadAttribute($value)
    {
        return json_decode($value);
    }
}
