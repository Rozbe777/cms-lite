<?php


namespace App\Classes\Pay\Invoice;


use App\Models\Invoice;

trait Invoicable
{
    function createInvoice($amount, $userId = null)
    {

        if (empty($userId))
            $userId = auth()->id();
        $invoice = new Invoice();
        $invoice->user_id = $userId;
        $invoice->amount = $amount;
        $invoice->save();
        return $invoice;
    }
}
