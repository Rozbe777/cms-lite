<?php


namespace App\Classes\Payment\Classes;


use App\Classes\Payment\Bank;

class PaymentCenterTrigger
{
    public function pay()
    {
        $notifire = Bank::getInstance(Bank::ONLINE_TYPE);

        $notifire->startPayment();
    }

    public function verify()
    {
        $notifire = Bank::getInstance(Bank::ONLINE_TYPE);

        $notifire->callback();
    }
}
