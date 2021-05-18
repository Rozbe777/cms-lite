<?php
/**
 * Created by Limito Co.
 * User: Mohsen Shahbazi
 * Date: 9/4/19
 * Time: 14:26
 */

namespace App\Classes\Setting;


use Illuminate\Support\Facades\Facade;

class SettingFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'setting';
    }
}