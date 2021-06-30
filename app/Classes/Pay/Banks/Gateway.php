<?php


namespace App\Classes\Pay\Banks;
use App\Models\Gateway as GatewayModel;

trait Gateway
{

    private function getGatewayById($gatewayId = null)
    {
        return GatewayModel::find($gatewayId);
    }

    private function getDefaultGateway()
    {
        $gateway = GatewayModel::whereIsDefault(1)->first();
        if (!empty($gateway)) {
            return $gateway;
        }
        $gateway = GatewayModel::first();
        return $gateway;
    }
}
