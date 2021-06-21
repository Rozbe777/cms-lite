<?php


namespace App\Classes\Payment;


interface iBank
{
    function startPayment();

    function callback();
}
