<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
class User extends Authenticatable
{

    use HasFactory, Notifiable, HasApiTokens;
    use LaravelEntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded=[];

    /**
     * @var array|string[]
     */
    protected $appends = ['fullname', 'persianStatus','userRole'];

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
     * @var mixed|string
     */

    public function categories()
    {
        return $this->hasMany(Category::class, 'user_id','id');
    }

    public function tags()
    {
        return $this->hasMany(Tag::class, 'user_id','id');
    }

    public function pages()
    {
        return $this->hasMany(Page::class, 'user_id','id');
    }

    public function getFullnameAttribute()
    {
        if (empty($this->attributes['name']) && empty($this->attributes['last_name'])) {
            return $this->attributes['mobile'];
        }
        return $this->attributes['name'] . ' ' . $this->attributes['last_name'];
    }

    public function getAvatarAttribute()
    {
        return asset('images/avatar.jpg');
    }

    public function getPersianStatusAttribute()
    {
        return $this->attributes['status'] == 'active' ? 'فعال' : 'بسته شده';
    }

    public function getUserRoleAttribute()
    {
        return $this->roles()->first()->name;
    }



}
