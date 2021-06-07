<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ["content_count", "slug", "url", "percentage"
//        "real_url"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contents()
    {
        return $this->belongsToMany(Content::class);
    }

    public function pages()
    {
        return $this->belongsToMany(Page::class);
    }

//    public function categories()
//    {
//        return $this->belongsToMany(Category::class);
//    }

    public function viewCounts()
    {
        return $this->morphOne(ViewCount::class, 'viewcountable');
    }

//    public function getRealUrlAttribute()
//    {
//        return tag_url($this->attributes['slug']);
//    }

    public function getSlugAttribute()
    {
        return str_replace(' ', '_', $this->name);
    }

    public function getContentCountAttribute()
    {
        $tag = ContentTag::where('tag_id', $this->id);
        return $tag->count();
    }

    public function getUrlAttribute()
    {
        return route('front.tags', $this->attributes['name']);
    }

    public function getPercentageAttribute()
    {
        $tags = Tag::with('user')->with('contents')->get();
        $all = 0;
        foreach ($tags as $tag) {
            $all += $tag->viewCounts->view_count;
        }
        $percent = ($this->viewCounts->view_count / $all) * 100;
        return $percent;
    }
}
