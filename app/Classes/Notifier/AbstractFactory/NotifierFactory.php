<?php


namespace App\Classes\Notifier\AbstractFactory;


class NotifierFactory implements INoticeFactory
{
    /**
     * @return ISmsWriter
     */
    public function createSmsWriter(): ISmsWriter
    {
        return new SmsWriter();
    }

    /**
     * @return IEmailWriter
     */
    public function createEmailWriter(): IEmailWriter
    {
        return new EmailWriter();
    }
}
