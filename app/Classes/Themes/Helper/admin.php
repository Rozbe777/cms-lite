<?php
/**
 * Created by Zerone Co.
 * User: roozbeh rahmani
 * Date: 2/2/21
 * Time: 16:20
 */
if (!function_exists('adminTheme')) {
    /**
     * Get current theme path.
     * @param $path string
     * @param null $theme
     * @return string $path
     */
    function adminTheme($path, $theme = 'frest')
    {
        return asset('panel/themes/'.$theme . "/" . $path);
    }
}
if (!function_exists('placeholder')) {

    function placeholder()
    {
        return adminTheme('placeholder.jpg');
    }
}
