<?php

namespace App\Models;

use App\Models\Traits\SelfReferenceTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string name
 * @property string slug
 * @property string image
 * @property mixed content
 * @property mixed metadata
 * @property mixed fields
 * @property Integer parent_id
 * @property Integer layout_id
 * @property Integer module_id
 * @property boolean is_menu
 * @property mixed|string status
 */
class Category extends Model
{


    use HasFactory, SoftDeletes, SelfReferenceTrait;

    protected $guarded = [];
    protected $appends = [
        "content_count",
        "url",
//        "real_url",
//        "edit_url",
//        "delete_url"
    ];

//    public function getRealUrlAttribute()
//    {
//        return category_url($this->attributes['slug']);
//    }
//
//    public function getDeleteUrlAttribute()
//    {
//        return route("admin.category.destroy", ['category' => $this->id]);
//    }
//
//    public function getEditUrlAttribute()
//    {
//        return route("admin.category.edit", ['category' => $this->id]);
//    }


    public function getContentCountAttribute()
    {
        $category = CategoryContent::where('category_id', $this->id);
        return $category->count();
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contents()
    {
        return $this->belongsToMany(Content::class);
    }



    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

//    public function tags()
//    {
//        return $this->belongsToMany(Tag::class, 'category_tag', 'category_id', 'tag_id');
//    }

    public function viewCounts()
    {
        return $this->morphOne(ViewCount::class,'viewcountable');
    }

    public function scopeActive($query)
    {
        return $query->where("status", "active");
    }

    public function getUrlAttribute()
    {
        return route('front.categories', $this->attributes['slug']);
    }

}
