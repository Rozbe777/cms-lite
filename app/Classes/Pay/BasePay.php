<?php


namespace App\Classes\Pay;


use App\Classes\Pay\Banks\Gateway;
use App\Models\Bank;
use Illuminate\Support\Facades\Auth;

const GATEWAY_NAME_SPACE = __NAMESPACE__ . '\Banks\\';
abstract class BasePay
{
    use Gateway;

    public $userId, $gatewayId, $callbackUrl = 'callback';
    private $invoice;

    abstract function handle($gateway, $invoice);

    abstract function callback($invoiceId);


    function callbackUrl($callbackUrl)
    {
        $this->callbackUrl = $callbackUrl;
        return $this;
    }

    function getCallbackUrl()
    {
        return $this->callbackUrl;
    }

    function userId($userId = null)
    {
        if (empty($userId))
            $this->userId = Auth::id();
        else
            $this->userId = $userId;

        return $this;
    }

    function gatewayId($gatewayId = null)
    {
        if (empty($gatewayId))
            $this->gatewayId = $this->getDefaultGateway()->id;
        else
            $this->gatewayId = $gatewayId;

        return $this;
    }

    function getGateway()
    {
        return $this->getGatewayById($this->gatewayId);
    }

    function getBank()
    {
        return Bank::find($this->getGateway()->bank_id);
    }

    public function start($amount)
    {
        $gatewayModel = $this->getGateway();
        throw_if(!$gatewayModel, new \Exception("Exception: Gateway not found"));

        if (method_exists(Pay::class, 'createInvoice')) {
            $this->invoice = $this->createInvoice($amount,$gatewayModel->id, $this->userId, $this->getCallbackUrl());
        }
        $bank = $this->getBank();

        $bankClass = $this->callClassByName($bank->class);
        $this->handle($bankClass, $this->invoice);
        $result = $bankClass->handle(empty($this->invoice) ? $amount : $this->invoice);

        return $result;
    }

    function end($invoiceId)
    {
        $gatewayModel = $this->getGateway();
        throw_if(!$gatewayModel, new \Exception("Gateway not found"));
        $bank = $this->getBank();
        $bankClass = $this->callClassByName($bank->class);
        $this->callback($invoiceId);
        $result = $bankClass->callback($invoiceId);
        return $result;
    }

    private function callClassByName($bankClass)
    {
        $bankClass = GATEWAY_NAME_SPACE . $bankClass;
        return new $bankClass();
    }
}
