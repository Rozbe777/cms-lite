<?php
/**
 * Created by Zerone Co.
 * User: Mohsen Shahbazi
 * Date: 7/12/21
 * Time: 14:21
 */

namespace App\Classes\SaleChannel;
use \App\Models\ChannelDetail;

class SaleChannel
{


    function handle(){
        $channels = ChannelDetail::with('channel')->active()->get();
        return $channels;
    }
}
