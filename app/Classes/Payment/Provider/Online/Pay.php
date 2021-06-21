<?php


namespace App\Classes\Payment\Provider\Online;


use App\Classes\Payment\BaseBank;
use App\Classes\Payment\iBank;

class Pay implements iBank
{
    private $prefixConfigPath = 'bank.type.online';
    private $defaultGateway, $gateway;

    public function __construct($defaultGateway = null,$gateway = null)
    {
        if (empty($defaultGateway)){
            $this->defaultGateway = config("$this->prefixConfigPath.default_gateway");
            $this->gateway = config("$this->prefixConfigPath.gateways.$this->defaultGateway");
        }
    }

    function startPayment()
    {
        $gateway = $this->gateway;
        $className = $gateway['class'];

        (new $className)->setMerchantId()->setMinAmount()->setRequestUrl()->setPayUrl()->setVerificationUrl()->setPaymentUrl()->startPayment();
    }

    function callback()
    {
        $gateway = $this->gateway;
        $className = $gateway['class'];

        (new $className)->setMerchantId()->setMinAmount()->setRequestUrl()->setVerificationUrl()->callback();
    }
}
