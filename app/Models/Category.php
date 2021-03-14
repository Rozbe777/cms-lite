<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string name
 * @property string slug
 * @property string image
 * @property mixed description
 * @property mixed fields
 * @property Integer parent_id
 * @property Integer layout_id
 * @property Integer module_id
 * @property mixed|string status
 */
class Category extends Model
{


    use HasFactory;

    protected $fillable = [
        "name",
        "slug",
        "image",
        "description",
        "fields",
        "parent_id",
        "layout_id",
        "module_id",
        "status"
    ];
    protected $appends = [
        "content_count",
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


    public function contents()
    {
        return $this->belongsToMany(Content::class);
    }

    public function scopeActive($query)
    {
        return $query->where("status", "active");
    }


}
