<?php


namespace App\Http\Controllers\Front;


use App\Classes\Pay\Pay;
use App\Http\Controllers\Controller;

class InvoiceController extends Controller
{



    function callback($invoiceId)
    {
        return (new Pay())->end($invoiceId);
    }

}
