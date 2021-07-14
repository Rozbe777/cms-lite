<?php


namespace App\Classes\Themes;


use App\Models\ComponentData;

class Component
{
    function menu()
    {
        return ComponentData::get(['component_data.id', 'component_data.title']);

    }

}
