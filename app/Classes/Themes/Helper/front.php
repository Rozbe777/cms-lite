<?php

use Illuminate\Contracts\View\Factory as ViewFactory;

if (!function_exists('frontView')) {
    /**
     * Get the evaluated view contents for the given admin view.
     *
     * @param string|null $view
     * @param \Illuminate\Contracts\Support\Arrayable|array $data
     * @param array $mergeData
     * @param string $adminThemeName
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    function frontView($view = null, $data = [], $mergeData = [],$frontThemeName="shop")
    {
        $factory = app(ViewFactory::class);

        if (func_num_args() === 0) {
            return $factory;
        }

        return $factory->make("front.includes.$frontThemeName.".$view, $data, $mergeData);
    }
}
