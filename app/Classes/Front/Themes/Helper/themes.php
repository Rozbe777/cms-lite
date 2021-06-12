<?php
/**
 * Created by Zerone Co.
 * User: mehrshad Darvish
 * Date: 2/2/21
 * Time: 16:20
 */
use Illuminate\Contracts\View\Factory as ViewFactory;

if (!function_exists('frontView')) {
    /**
     * Get the evaluated view contents for the given admin view.
     *
     * @param string|null $view
     * @param \Illuminate\Contracts\Support\Arrayable|array $data
     * @param array $mergeData
     * @param string $frontThemeName
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    function frontView($view = null, $data = [], $mergeData = [],$frontThemeName="basic")
    {
        $factory = app(ViewFactory::class);

        if (func_num_args() === 0) {
            return $factory;
        }

        return $factory->make("themes.".$view, $data, $mergeData);
    }
}


//if (!function_exists('adminTheme')) {
//    /**
//     * Get current theme path.
//     * @param $path string
//     * @param null $theme
//     * @return string $path
//     */
//    function adminTheme($path, $theme = 'frest')
//    {
//        return asset('panel/themes/'.$theme . "/" . $path);
//    }
//}

//if (!function_exists('placeholder')) {
//
//    /**
//     * for images
//     * @return string default placeholder image
//     */
//    function placeholder()
//    {
//        return adminTheme('placeholder.jpg');
//    }
//}
