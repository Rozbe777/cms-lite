<?php


namespace App\Classes\Notifier\AbstractFactory;


interface INoticeFactory
{
    public function createSmsWriter(): ISmsWriter;
    public function createEmailWriter(): IEmailWriter;
}
