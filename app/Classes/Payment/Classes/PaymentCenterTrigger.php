<?php


namespace App\Classes\Payment\Classes;


use App\Classes\Payment\Bank;

class PaymentCenterTrigger
{
    public function handle()
    {
        $notifire = Bank::getInstance(Bank::ONLINE_TYPE);

        $notifire->startPayment();
        $notifire->callback();
    }
}
