<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ["name"];
    protected $appends = ["content_count","slug"
//        "real_url"
    ];

    public function content()
    {
        return $this->belongsToMany(Content::class);
    }

//    public function getRealUrlAttribute()
//    {
//        return tag_url($this->attributes['slug']);
//    }

    public function getSlugAttribute()
    {
        return str_replace(' ','_',$this->name);
    }

    public function getContentCountAttribute()
    {
        $tag = ContentTag::where('tag_id', $this->id);
        return $tag->count();
    }
}
