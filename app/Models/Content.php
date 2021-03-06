<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Morilog\Jalali\Jalalian;

/**
 * @property string owner
 * @property string title
 * @property string slug
 * @property mixed content
 * @property mixed metadata
 * @property mixed fields
 * @property string status
 * @property integer user_id
 * @property integer layout_id
 * @property mixed image
 * @property string comment_status
 * @property integer weight
 * @property boolean is_index
 * @property boolean is_menu
 */
class Content extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ['url', 'image_url', 'related_contents'
//        'related_content'
    ];

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

    function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function getUrlAttribute()
    {
        return route('front.contents', $this->attributes['slug']);
    }

    public function getImageUrlAttribute()
    {
        if (!empty($this->attributes['image']))
            return route('image.show', $this->attributes['image']);
        return null;
    }

    public function getRelatedContentsAttribute()
    {
        if ($this->attributes['owner'] == 'content') {
            //  $categoriesIds = CategoryContent::where('content_id', $this->attributes['id'])->pluck('category_id')->unique()->toArray();
            // $contentIds = CategoryContent::whereIn('category_id', $categoriesIds)->pluck('content_id')->unique()->toArray();
            // return Content::whereIn('id', $contentIds)->content()->where('id','!=',$this->attributes['id'])->limit(5)->get();
            return [];
        } else {
            return [];
        }
    }

    /*   public function getJalaliCreatedAtAttribute()
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
       }*/

    public function getCreatedAtAttribute()
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

    function scopeContent($q)
    {
        return $q->where('owner', 'content');
    }

    function scopePage($q)
    {
        return $q->where('owner', 'page');
    }

    function scopeIsMenu($q)
    {
        return $q->where('is_menu', 1);
    }

//    public function getRelatedContentAttribute()
//    {
//        $id = [];
//        $i = 0;
//        $content = [];
//        $categories = $this->categories;
//        if (count($categories) > 0) {
//            foreach ($categories as $cat) {
//                foreach ($cat->contents as $contents) {
//                    if ($contents->id != $this->id && !in_array($contents->id, $id) && $i < config("view.list.number")) {
//                        $id[] = $contents->id;
//                        $content[$i] = $contents;
//                        $i++;
//
//                    }
//                }
//            }
//            return $content;
//        }
//        return false;
//    }

}
