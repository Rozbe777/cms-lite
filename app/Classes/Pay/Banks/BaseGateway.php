<?php


namespace App\Classes\Pay\Banks;


use App\Models\Bank;
use App\Models\Gateway as GatewayModal;
use App\Models\Transaction;

abstract class BaseGateway implements iGateway
{
    function __construct()
    {
    }

    function getBank()
    {
        return Bank::whereClass($this->getGatewayNameByClass())->first();
    }

    function getGateway($gatewayId)
    {
        return GatewayModal::find($gatewayId);
    }

    function getGatewayNameByClass()
    {
        $class = get_called_class();
        $array = explode('\\', $class);
        return $array[sizeof($array) - 1];
    }

    function onDone($invoice, $bankResult, $payload)
    {
        $invoice->status = 'paid';
        $invoice->paid_at = now();
        $invoice->bank_result = $bankResult;
        $invoice->payload = $payload;
        $invoice->save();
        $this->createTransaction($invoice);
    }

    function createTransaction($invoice)
    {
        return Transaction::create([
            'user_id' => $invoice->user_id,
            'transaction_type_id' => Transaction::TRANSACTION_TYPE_ONLINE_PAY,
            'amount' => $invoice->amount,
            'description' => $invoice->description,
            'payload' => json_encode(['invoice_id' => $invoice->id]),
        ]);
    }

    function onFail($invoice, $bankResult, $payload)
    {
        $invoice->status = 'fail';
        $invoice->bank_result = $bankResult;
        $invoice->payload = $payload;
        $invoice->save();
    }
}
