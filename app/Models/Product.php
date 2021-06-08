<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Morilog\Jalali\Jalalian;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ['jalali_created_at', 'url', 'related_content'];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_content', 'content_id', 'category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'content_tag', 'content_id', 'tag_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function viewCounts()
    {
        return $this->morphOne(ViewCount::class, 'viewcountable');
    }

    public function getJalaliCreatedAtAttribute()
    {
        switch (setting("date_time")) {
            case "ago":
                return Jalalian::forge($this->attributes['created_at'])->ago();
                break;
            case "normal":
                return $this->attributes['created_at'];
            case "normal_format":
                return Carbon::make($this->attributes['created_at'])->format('d/m/Y');
            case "off":
                return '';
                break;
            default:
                return Jalalian::forge($this->attributes['created_at'])->format(setting("date_time"));
        }
    }

    public function getRelatedProductAttribute()
    {
        $id = [];
        $i = 0;
        $categories = $this->categories;
        foreach ($categories as $cat) {
            foreach ($cat->products as $products) {
                if ($products->id != $this->id && !in_array($products->id, $id) && $i < config("view.list.number")) {
                    $id[] = $products->id;
                    $content[$i] = $products;
                    $i++;
                }
            }
        }
        return $products;
    }
}
