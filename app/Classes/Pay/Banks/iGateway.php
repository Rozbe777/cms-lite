<?php


namespace App\Classes\Pay\Banks;


interface iGateway
{
    function callback($invoiceId);

    function start($amount);

}
