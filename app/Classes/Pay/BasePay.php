<?php


namespace App\Classes\Pay;


abstract class BasePay
{
    private $invoice = null;

    abstract function handle();

    abstract function callback();

    public function start($amount)
    {

        if (method_exists(Pay::class, 'createInvoice')) {
            $this->invoice = $this->createInvoice($amount);
        }
        $this->handle();
    }
}
