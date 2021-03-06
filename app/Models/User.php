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
 * @property string family
 * @property string email
 * @property string password
 * @property string phone
 * @property string status
 * @property string registration_source
 * @property Carbon|null email_verified_at
 * @method static find(Integer $user_id)
 * @method static findOrFail($id)
 * @method static where(string $string, $userIds)
 * @method static paginate(int $int)
 */
class User extends Authenticatable
{

    use HasFactory, Notifiable,HasApiTokens;
    use LaravelEntrustUserTrait;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected  $fillable = [
        'name', 'family', 'email', 'password', 'phone', 'status', 'registration_source','email_verified_at'
    ];

    /**
     * @var array|string[]
     */
    protected  $appends = ['fullname','persianStatus'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected  $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected  $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullnameAttribute()
    {
        if (empty($this->attributes['name']) && empty($this->attributes['family'])) {
            return $this->attributes['phone'];
        }
        return $this->attributes['name'] . ' ' . $this->attributes['family'];
    }

    public function getPersianStatusAttribute()
    {
        return $this->attributes['status'] =='active'?'فعال':'بسته شده';
    }


}
