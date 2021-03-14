<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Morilog\Jalali\Jalalian;

class Content extends Model
{
    use HasFactory;

    protected $fillable = [
        "owner",
        "title",
        "slug",
        "content",
        "fields",
        "status",
        "user_id",
        "layout_id",
        "view_count",
        "image",
        "comment_status",
        "weight"
    ];
//    protected $appends = ['short_content', "real_url", "edit_url", "rate", "widget_delete_url", "text_content", 'category_name', 'jalali_created_at', 'active_comment', 'normal_fields'];




    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    function scopeActive($query)
    {
        return $query->where('status', 'active');
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

}
