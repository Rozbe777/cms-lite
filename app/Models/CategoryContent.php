<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryContent extends Model
{
    use HasFactory;
    protected $fillable = ["category_id" , "content_id"];
    protected $table = 'category_content';
}
