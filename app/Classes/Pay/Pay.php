<?php


namespace App\Classes\Pay;


use App\Classes\Pay\Banks\Gateway;
use App\Classes\Pay\Invoice\Invoicable;

class Pay extends BasePay
{
    use Invoicable;


    /**
     * @param $invoiceId
     * @return mixed
     */
    function callback($invoiceId)
    {
        // TODO: Implement callback() method.
    }

    function handle($gateway, $invoice)
    {
        // TODO: Implement handle() method.
    }
}
