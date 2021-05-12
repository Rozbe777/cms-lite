<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded=[];

    public function categories()
    {
        return $this->belongsToMany(Category::class,'category_page', 'page_id', 'category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class,'page_tag', 'page_id', 'tag_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contents()
    {
        return $this->hasMany(Content::class,'page_id','id');
    }
}
