<?php


namespace App\Classes\Payment;


abstract class BaseBank
{
    protected $name = null;
    protected $bank;
    protected $paymentId;
    protected $amount;
    protected $authority;
    protected $callbackUrl;

    function gatewayClass()
    {
        return config('bank.gateways.' . $this->name() . '.class');
    }

    function default()
    {
        return config('bank.setting.default'); //zarinpal
    }

    function name()
    {
        if (empty($this->name)) {
            $this->name = $this->default();
        }
        return $this->name;

    }

    function status()
    {
        return config('bank.gateways.' . $this->name() . '.status');
    }

    function type()
    {
        return config('bank.gateways.' . $this->name() . '.type');
    }

    function logo()
    {
        return config('bank.gateways.' . $this->name() . '.logo');
    }


    function minAmount()
    {
        return config('bank.setting.min_amount');
    }

    function requestUrl()
    {
        return config('bank.gateways.' . $this->name() . '.request_url');
    }


    function payUrl()
    {
        return config('bank.gateways.' . $this->name() . '.pay_url');
    }

    function verificationUrl()
    {
        return config('bank.gateways.' . $this->name() . '.verification_url');
    }


    function merchantId()
    {
        return config('bank.gateways.' . $this->name() . '.merchant_id');
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

    function amount()
    {
        return $this->amount;
    }

    function payment()
    {
        return Payment::find($this->paymentId);
    }

    function paymentId()
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
