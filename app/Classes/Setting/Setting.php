<?php

namespace App\Classes\Setting;

/**
 * Created by Limito Co.
 * User: Mohsen Shahbazi
 * Date: 9/4/19
 * Time: 14:20
 */

use App\Classes\Setting\Exceptions\SettingException;
use App\Models\Setting as Model;

class Setting
{
    protected static $instance;

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Setting();
        }
        return self::$instance;
    }

    /**
     * @param $key string
     * @param null $default
     * @return string
     */
    function get($key, $default = null)
    {
        /*return Cache::rememberForever('settings_' . $key, function () use ($key, $default) {
            $model = Model::where('key', $key)->first();
            if (empty($model))
                return $default;
            return $model->value;
        });*/
        $model = Model::where('key', $key)->first();
        if (empty($model))
            return $default;
        return $model->value;

    }

    /**
     * @param $key
     * @param $value
     * @return mixed
     * @throws SettingException
     */
    function set($key, $value)
    {
        $model = Model::where('key', $key)->first();
        if (empty($model))
            throw new SettingException('Setting key not found!');
        $model->value = $value;
        $model->save();
        return $model;
    }
}
