<?php


namespace App\Classes\Pay\Banks;
use App\Models\Gateway as GatewayModel;

trait Gateway
{

    private function getGateway($gatewayId = null)
    {
        if (empty($gatewayId)) {
            return $this->getDefaultGateway();
        }
        $gateway = GatewayModel::find($gatewayId);
        if (!empty($gateway)) {
            return $gateway;
        } else {
            return $this->getDefaultGateway();
        }
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
