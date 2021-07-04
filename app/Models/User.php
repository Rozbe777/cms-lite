<?php

namespace App\Models;

use App\Classes\Notifier\iUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Passport\HasApiTokens;
use phpDocumentor\Reflection\Types\Integer;
use Shanmuga\LaravelEntrust\Traits\LaravelEntrustUserTrait;

/**
 * @property string name
 * @property string last_name
 * @property string email
 * @property string password
 * @property string mobile
 * @property string status
 * @property string avatar
 * @property string mobile_verified_at
 * @property string registration_source
 * @property Carbon|null email_verified_at
 * @method static find(Integer $user_id)
 * @method static findOrFail($id)
 * @method static paginate(int $int)
 */
class User extends Authenticatable implements iUser
{

    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;
    use LaravelEntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * @var array|string[]
     */
    protected $appends = ['fullname', 'persianStatus', 'userRole', 'userRoleName'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * @return HasMany
     */
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'user_id','id');
    }

    /**
     *
     * @return HasMany
     */

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function tags(): HasMany
    {
        return $this->hasMany(Tag::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function pages(): HasMany
    {
        return $this->hasMany(Page::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function themes(): HasMany
    {
        return $this->hasMany(Theme::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function contents(): HasMany
    {
        return $this->hasMany(Content::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'user_id', 'id');
    }

    /**
     * @return HasMany
     */
    public function coupons(): HasMany
    {
        return $this->hasMany(Coupon::class, 'user_id', 'id');
    }

    public function getFullnameAttribute()
    {
        if (empty($this->attributes['name'])) {
            return $this->attributes['mobile'];
        }
        return $this->attributes['name'] . ' ' . $this->attributes['last_name'];
    }

    /**
     * @return string
     */
    public function getAvatarAttribute(): string
    {
        return asset('images/avatar.jpg');
    }

    /**
     * @return string
     */
    public function getPersianStatusAttribute(): string
    {
        return $this->attributes['status'] == 'active' ? 'فعال' : 'بسته شده';
    }

    public function getUserRoleAttribute()
    {
        return $this->roles()->first()->name;
    }

    /**
     * @return array|Application|Translator|string|null
     */
    public function getUserRoleNameAttribute()
    {
        $role = $this->roles()->first();
        if (empty($role))
            return __('message.errors.403');
        return $role->name;
    }
}
