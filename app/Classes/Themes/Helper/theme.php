<?php
/**
 * Created by Zerone Co.
 * User: roozbeh rahmani
 * Date: 2/2/21
 * Time: 16:20
 */

use Illuminate\Contracts\View\Factory as ViewFactory;

if (!function_exists('page')) {
    /**
     * Get current theme path.
     * @param $path string
     * @param array $data
     * @param array $mergeData
     * @param null $theme
     * @return string $path
     */
    function page($path, $data = [], $mergeData = [], $theme = null)
    {
        if (empty($theme)) {
            $theme = \App\Models\Theme::where('status', 'active')->first();

        }
        return view('themes/' . $theme->name . "/" . $path, $data, $mergeData);
    }
}
if (!function_exists('themeAsset')) {
    function themeAsset($path)
    {
        $themeName = theme()->name;
        return asset("themes/$themeName/$path");
    }
}
if (!function_exists('theme')) {
    function theme()
    {

        return \App\Models\Theme::where('status', 'active')->first();
    }
}

if (!function_exists('includes')) {
    function includes($path)
    {
        return themePath("includes/$path");
    }
}
if (!function_exists('themePath')) {
    function themePath($path = "")
    {
        $themeName = theme()->name;
        return "themes/$themeName/$path";
    }
}

if (!function_exists('layout')) {
    /**
     * Get current theme path.
     * @param $path string
     * @return string $path
     */
    function layout($path)
    {
        $themeName = theme()->name;
        return 'themes/' . $themeName . "/layouts." . $path;
    }
}

if (!function_exists('components')) {
    /**
     * Get current theme path.
     * @param $path string
     * @return string $path
     */
    function components($path)
    {
        $themeName = theme()->name;
        return 'themes/' . $themeName . "/components." . $path;
    }
}

if (!function_exists('theme_setting')) {
    function theme_setting($parentName, $value, $childValue = null)
    {
        return new \App\Classes\Themes\ThemeSettingClass($parentName, $value, $childValue);
    }
}
