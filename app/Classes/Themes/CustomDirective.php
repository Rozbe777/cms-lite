<?php


namespace App\Classes\Themes;


class CustomDirective
{
    private function normalize($key)
    {
        $key = str_replace('"', "", $key);
        $key = str_replace("'", "", $key);
        return trim($key);
    }

    function handle()
    {

        \Blade::directive('themeSetting', function ($expression1) {
            $expression = explode(',', $expression1);

            $parentKey = null;


            if (sizeof($expression) == 3) {

                list($parentKey, $key, $childValue) = explode(',', $expression1);
                $parentKey = $this->normalize($parentKey);
                $key = $this->normalize($key);
                $childValue = $this->normalize($childValue);
                return theme_setting($parentKey, $key, $childValue)->content();
            } else if (sizeof($expression) == 2) {
                list($parentKey, $key) = explode(',', $expression1);
                $parentKey = $this->normalize($parentKey);
                $key = $this->normalize($key);
                return theme_setting($parentKey, $key)->content();
            } else {
                return null;
            }


        });
    }
}
