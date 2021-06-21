<?php


namespace App\Classes\Payment;


class Bank implements iBank
{
    const ONLINE_TYPE = 'Online';
    const OFFLINE_TYPE = 'Offline';

    protected ?iBank $provider = null;
    public $name;

    public function __construct($type = self::ONLINE_TYPE, $name = null)
    {
        $funcPath = __NAMESPACE__ . "\\Provider\\$type\\Pay";

        $this->provider = new $funcPath();

        $this->name = $name;
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
        return $this->provider->callback();
    }
}
