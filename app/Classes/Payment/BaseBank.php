<?php


namespace App\Classes\Payment;


abstract class BaseBank
{
    protected $name = null;
    private $bank, $paymentId, $amount, $authority, $callbackUrl, $requestUrl, $payUrl, $verificationUrl, $paymentUrl, $merchantId, $minAmount, $userName, $mobile;
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

    function setUserName()
    {
        //TODO: ???
    }

    function setMobile()
    {
        //TODO: ???
    }

    function setMerchantId()
    {
        $this->merchantId = config('bank.type.online.gateways.' . $this->name() . '.merchant_id');
        return $this;
    }

    function setMinAmount()
    {
        $this->minAmount = config('bank.type.online.default_min_amount');
        return $this;
    }

    function setRequestUrl()
    {
        $this->requestUrl = config('bank.type.online.gateways.' . $this->name() . '.request_url');
        return $this;
    }


    function setPayUrl()
    {
        $this->payUrl = config('bank.type.online.gateways.' . $this->name() . '.pay_url');
        return $this;
    }

    function setVerificationUrl()
    {
        $this->verificationUrl = config('bank.type.online.gateways.' . $this->name() . '.verification_url');
        return $this;
    }

    function setPaymentUrl()
    {
        $this->paymentUrl = config('bank.type.online.gateways.' . $this->name() . '.payment_url');
        return $this;
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

    function setAuthority($authority)
    {
        $this->authority = $authority;
        return $this;
    }

    function setCallbackUrl($callbackUrl)
    {
        $this->callbackUrl = $callbackUrl;
        return $this;
    }

    function getUserName()
    {
        //TODO: ????
    }

    function getMobile()
    {
        //TODO: ????
    }

    function getMerchantId()
    {
        return $this->merchantId;
    }

    function getMinAmount()
    {
        return $this->minAmount;
    }

    function getRequestUrl()
    {
        return $this->requestUrl;
    }

    function getPayUrl()
    {
        return $this->payUrl;
    }

    function getVerificationUrl()
    {
        return $this->verificationUrl;
    }

    function getPaymentUrl()
    {
        return $this->paymentUrl;
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

    function callbackUrl()
    {

        return url($this->callbackUrl);
    }
}
