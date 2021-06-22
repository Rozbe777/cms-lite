<?php


namespace App\Classes\Pay;


use App\Classes\Pay\Invoice\Invoicable;

class Pay extends BasePay
{
    use Invoicable;


    /**
     * @return mixed
     */
    function handle()
    {

    }

    /**
     * @return mixed
     */
    function callback()
    {
        // TODO: Implement callback() method.
    }
}
