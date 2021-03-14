<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentTag extends Model
{
    use HasFactory;
    protected $fillable = ["tag_id" , "content_id"];
    protected $table = 'content_tag';

}
