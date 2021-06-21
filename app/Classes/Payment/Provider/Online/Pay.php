<?php


namespace App\Classes\Payment\Provider\Online;


use App\Classes\Payment\BaseBank;
use App\Classes\Payment\iBank;

class Pay implements iBank
{
    private $to, $body;
    private $prefixConfigPath = 'bank.type.online';
    public $name;

    public function __construct()
    {

    }

    function startPayment()
    {
        $defaultGateway = config("$this->prefixConfigPath.default_gateway");
        $gateway = config("$this->prefixConfigPath.gateways.$defaultGateway");
        $className = $gateway['class'];
//$x = (new $className)->setMerchantId()->setMinAmount(); dd($x)
        (new $className)->setMerchantId()->setMinAmount()->setRequestUrl()->handle();
    }

    function callback()
    {

    }
}
