<?php


namespace App\Classes\Payment;


abstract class BaseBank
{
    protected $name = null;
    protected $bank, $paymentId, $amount, $authority, $callbackUrl, $url,$merchantId;
    private $prefixConfigPath = 'bank.type.online';

    /**
     * Gateway constructor.
     */
    public function __construct()
    {
        $this->getGateway();
    }

    private function getGateway()
    {
        $defaultGateway = config("$this->prefixConfigPath.default_gateway");
        $gateway = config("$this->prefixConfigPath.gateways.$defaultGateway");
    }

    function gatewayClass()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.class');
    }

    function default()
    {
        return config('bank.type.online.default_gateway'); //zarinpal
    }

    function name()
    {
        if (empty($this->name)) {
            $this->name = $this->default();
        }
        return $this->name;

    }

    function setStatus()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.status');
    }

    function setType()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.type');
    }

    function setLogo()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.logo');
    }


    function setMinAmount()
    {
        $this->minAmount = config('bank.type.online.default_min_amount');
        return $this;
    }

    function setRequestUrl()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.request_url');
    }


    function setPayUrl()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.pay_url');
    }

    function setVerificationUrl()
    {
        return config('bank.type.online.gateways.' . $this->name() . '.verification_url');
    }


    function setMerchantId()
    {
        $this->merchantId = config('bank.type.online.gateways.' . $this->name() . '.merchant_id');
        return $this;
//        return config('bank.type.online.gateways.' . $this->name() . '.merchant_id');
    }


    function setAuthority($authority)
    {
        $this->authority = $authority;
        return $this;
    }

    function authority()
    {
        return $this->authority;
    }

    function setAmount()
    {
        return $this->amount;
    }

    function setPayment()
    {
        return Payment::find($this->paymentId);
    }

    function setPaymentId()
    {
        return $this->paymentId;
    }


    function setCallbackUrl($callbackUrl)
    {
        $this->callbackUrl = $callbackUrl;
        return $this;
    }

    function callbackUrl()
    {

        return url($this->callbackUrl);
    }
}
