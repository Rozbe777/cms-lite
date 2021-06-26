<?php


namespace App\Classes\Pay\Banks;


class Zarinpal implements iGateway
{

    function callback($invoiceId)
    {

    }

    function handle($invoice)
    {
        return ['hi'];
    }
}
