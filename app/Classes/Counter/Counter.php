<?php


namespace App\Classes\Counter;


class Counter
{
    public function count($item)
    {
        $instance = $item->viewCounts;
        $instance->view_count++;
        $instance->save();
    }
}
