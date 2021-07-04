<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThemeSetting extends Model
{
    use HasFactory;

    function scopeActive($query)
    {
        return $query->whereStatus('active');
    }
    function scopeByThemeId($query,$themeId)
    {
        return $query->whereThemeId($themeId);
    }

    function scopeByName($query, $name)
    {
        return $query->whereName($name);
    }
}
