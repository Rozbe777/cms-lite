<?php


namespace App\Classes\Pay\Invoice;


use App\Models\Invoice;

trait Invoicable
{
    function createInvoice($amount, $gatewayId, $userId = null)
    {

        if (empty($userId))
            $userId = auth()->id();
        $invoice = new Invoice();
        $invoice->user_id = $userId;
        $invoice->gateway_id = $gatewayId;
        $invoice->amount = $amount;
        $invoice->save();
        return $invoice;
    }
}
