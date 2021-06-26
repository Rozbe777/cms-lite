<?php


namespace App\Classes\Pay;


use App\Classes\Pay\Banks\Gateway;

const GATEWAY_NAME_SPACE = __NAMESPACE__ . '\Banks\\';
abstract class BasePay
{
    use Gateway;

    public $userId, $gatewayId;
    private $invoice;

    abstract function handle($gateway, $invoice);

    abstract function callback();

    function userId($userId)
    {
        $this->userId = $userId;
        return $this;
    }

    function gatewayId($gatewayId)
    {
        $this->gatewayId = $gatewayId;
        return $this;
    }

    public function start($amount)
    {
        if (empty($this->userId)) {
            $this->userId = auth()->id();
        }

        if (method_exists(Pay::class, 'createInvoice')) {
            $this->invoice = $this->createInvoice($amount, $this->userId);
        }

        $gatewayModel = $this->getGateway($this->gatewayId);
        throw_if(!$gatewayModel, new \Exception("Gateway not found "));

        $gatewayClass = $gatewayModel->class;
        $gatewayClass = GATEWAY_NAME_SPACE . $gatewayClass;
        $gatewayClass = new $gatewayClass();
        $this->handle($gatewayClass, $this->invoice);
        $result = $gatewayClass->handle();
        return $result;
    }


}
