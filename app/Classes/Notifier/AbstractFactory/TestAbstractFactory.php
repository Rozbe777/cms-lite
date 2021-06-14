<?php


namespace App\Classes\Notifier\AbstractFactory;


class TestAbstractFactory
{
    public $to;
    public $body;
    public $from;

    public function __construct($to,$body,$from)
    {
        $this->to = $to;
        $this->body = $body;
        $this->from = $from;
    }

    public function testFactory(INoticeFactory $factory)
    {
        $sms = $factory->createSmsWriter();

       return $sms->send($this->to,$this->body,$this->from);
    }

    public function test2Factory()
    {
        $this->testFactory(new NotifierFactory());
    }
}
