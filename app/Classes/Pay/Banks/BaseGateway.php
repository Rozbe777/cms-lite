<?php


namespace App\Classes\Pay\Banks;


use App\Models\Bank;
use App\Models\Gateway as GatewayModal;

abstract class BaseGateway implements iGateway
{
    function __construct()
    {
    }

    function getBank()
    {
        return Bank::whereClass($this->getGatewayNameByClass())->first();
    }

    function getGateway($gatewayId)
    {
        return GatewayModal::find($gatewayId);
    }

    function getGatewayNameByClass()
    {
        $class = get_called_class();
        $array = explode('\\', $class);
        return $array[sizeof($array) - 1];
    }
}
