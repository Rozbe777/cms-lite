<?php
/**
 * Created by PhpStorm.
 * User: mohsen1
 * Date: 1/14/19
 * Time: 3:38 PM
 */

use Illuminate\Contracts\View\Factory as ViewFactory;

if (!function_exists('mobile')) {
    function mobile($mobile)
    {
        $mobile = convertDigit($mobile);
        $mobileregex = "/^[0][1-9]\d{9}$|^[1-9]\d{9}$/";

        if (preg_match($mobileregex, $mobile) === 1) {
            if (strlen($mobile) === 11)
                $mobile = substr($mobile, 1, strlen($mobile) - 1);
            return $mobile;
        } else {
            return false;
        }
    }
}
if (!function_exists('title')) {
    function title($prefix = null)
    {
        return trim($prefix . ' ' . setting('title'));
    }

}
if (!function_exists('pageTitle')) {
    function pageTitle($title = null, $prefix = null)
    {
        $siteTitle = title();
        return !empty($title) ? " $prefix $siteTitle - $title" : "$prefix $siteTitle";
    }
}
if (!function_exists('image')) {
    function image($image = null)
    {
        if (empty($image)) {
            return  adminTheme('placeholder.jpg');
        }

        //return url('uploads/' . $image);
        return themeAsset($image);
    }
}
if (!function_exists('uploadRoot')) {
    function uploadRoot($file = null)
    {
        if (empty($file)) {
            return url('uploads/');
        }
        return url('uploads/' . $file);
    }
}
if (!function_exists('setting')) {
    function setting($key)
    {
        return trim(\App\Classes\Setting\Setting::getInstance()->get($key));
    }
}
if (!function_exists('include_theme')) {
    function include_theme($path_name)
    {
        $currentTheme = \App\Classes\Theme\Theme::getInstance()->current();
        return "themes.$currentTheme.$path_name";
    }
}
if (!function_exists('activeAdminMenu')) {
    /**
     * Get the path to the theme folder.
     *
     * @param string $routeName
     * @return string
     */
    function activeAdminMenu($routeName = '')
    {


        if ($routeName == request()->route()->getName()) {
            return 'active';//'active';
        } else
            return '';
    }

}
if (!function_exists('getAdminMenus')) {
    function getAdminMenus()
    {

        $permissions = \Illuminate\Support\Facades\DB::table('permissions as p')
            ->where('p.is_menu', 1)
            ->where('parent_id', 0)
            ->orderBy('weight')
            ->get();
        $menus = [];
        foreach ($permissions as $index => $p) {
            $submenus = \Illuminate\Support\Facades\DB::table('permissions as p')
                ->where('p.is_menu', 1)
                ->where('parent_id', $p->id)
                ->get();


            $menus[$index] = [
                'display_name' => $p->display_name,
                'name' => $p->name,
                'icon' => $p->icon,
                'sub_menus' => $submenus
            ];
        }

        return json_decode(json_encode($menus));

    }
}

if (!function_exists('convertDigit')) {
    function convertDigit($string)
    {
        $persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $arabic = ['٩', '٨', '٧', '٦', '٥', '٤', '٣', '٢', '١', '٠'];

        $num = range(0, 9);
        $convertedPersianNums = str_replace($persian, $num, $string);
        $englishNumbersOnly = str_replace($arabic, $num, $convertedPersianNums);

        return $englishNumbersOnly;
    }
}

if (!function_exists('shorter')) {
    function shorter($text, $chars_limit)
    {
        if (strlen($text) > $chars_limit)
            return substr($text, 0, strrpos(substr($text, 0, $chars_limit), " ")) . '...';
        else return $text;
    }
}
