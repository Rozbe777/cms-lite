<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComponentData extends Model
{
    use HasFactory;

    function component()
    {
        return $this->hasOne(Component::class, 'id', 'component_id');
    }

    function items()
    {
        return $this->hasMany(ComponentItem::class);
    }

    public function getPayloadAttribute($value)
    {
        return json_decode($value);
    }

    function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    function scopeContents($query, $categoryId = 0, $limit = 3)
    {

        $category = Category::where('id', $categoryId)->first();
        if (!empty($category)) {
            return $category->contents()->limit($limit)->get();
        } else {
            return Content::content()->limit($limit)->get();
        }
    }
}
