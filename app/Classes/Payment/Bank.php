<?php


namespace App\Classes\Payment;


class Bank extends BaseBank implements iBank
{
    const ONLINE_TYPE = 'Online';
    const OFFLINE_TYPE = 'Offline';

    protected ?iBank $provider = null;

    public function __construct($type = self::ONLINE_TYPE)
    {
        $funcPath = __NAMESPACE__ . "\\Provider\\$type\\Pay";

        $this->provider = new $funcPath();
    }

    static function getInstance($type = self::ONLINE_TYPE)
    {
        return new Bank($type);
    }

    function startPayment()
    {
        return $this->provider->startPayment();
    }

    function callback()
    {
        // TODO: Implement callback() method.
    }
}
