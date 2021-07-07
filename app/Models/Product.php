<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rules\In;
use Morilog\Jalali\Jalalian;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ['jalali_created_at',
//        'related_content'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product', 'product_id', 'category_id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tag', 'product_id', 'tag_id');
    }

    public function attributes()
    {
        return $this->hasMany(Attribute::class,'product_id','id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function viewCounts()
    {
        return $this->morphOne(ViewCount::class, 'viewcountable');
    }

    public function galeries()
    {
        return $this->hasMany(Galery::class, 'product_id','id');
    }

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class);
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

//    public function getRelatedProductAttribute()
//    {
//        $id = [];
//        $i = 0;
//        $categories = $this->categories;
//        foreach ($categories as $cat) {
//            foreach ($cat->products as $products) {
//                if ($products->id != $this->id && !in_array($products->id, $id) && $i < config("view.list.number")) {
//                    $id[] = $products->id;
//                    $content[$i] = $products;
//                    $i++;
//                }
//            }
//        }
//        return $products;
//    }
}
