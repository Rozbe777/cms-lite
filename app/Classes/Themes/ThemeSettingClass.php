<?php


namespace App\Classes\Themes;


use App\Models\ThemeSetting;
use phpDocumentor\Reflection\Types\False_;

class ThemeSettingClass
{
    private $setting = null;
    private $value = null;


    private function searchInValue($value, $needle, $column = 'name')
    {

        $index = array_search($needle, array_column($value, $column));

        if (is_bool($index) && !$index) {
            return false;
        }
        return $value[$index];
    }

    function __construct($parentName, $value, $childValue = null)
    {
        if (empty(theme()->id)) {
            return false;
        }

        $setting = ThemeSetting::byThemeId(theme()->id)->byName($parentName)->first();
        if (empty($setting))
            return false;
        $this->setting = $setting;
        $array = json_decode($setting->value, true);
        $this->value = $this->searchInValue($array, $value);


        if ($this->isBox() && !empty($childValue) && !empty($this->value)) {
            $this->value = $this->searchInValue($this->value['value'], $childValue);
        }

        return false;
    }


    function value()
    {
        if (empty($this->value)) {
            return false;
        }
        return $this->value;
    }

    function content($default = null)
    {

        if (empty($this->value)) {
            return $default;
        }

        return $this->value['value'];

    }

    function type()
    {
        if (empty($this->value)) {
            return false;
        }
        return $this->value['type'];
    }

    function isBox()
    {
        return $this->type() == 'box';
    }

    function isActive()
    {
        if (empty($this->setting)) {
            return false;
        }
        return $this->setting->status == 'active';
    }

    function isVisible()
    {

        if (empty($this->value)) {
            return false;
        }
        return $this->value['visible'];
    }
}
