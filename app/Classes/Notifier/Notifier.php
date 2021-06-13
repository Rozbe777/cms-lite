<?php


namespace App\Classes\Notifier;


use App\Models\User;

class Notifier implements iNotifier
{
    const SMS_TYPE = 'Sms';
    const EMAIL_TYPE = 'Email';
    const PUSH_TYPE = 'Push';

    protected ?iNotifier $provider = null;

    public function __construct($type = self::SMS_TYPE)
    {
        $funcPath = __NAMESPACE__ . "\\Provider\\$type\\$type";

        $this->provider = new $funcPath();

    }

    static function getInstance($type = self::SMS_TYPE)
    {
        return new Notifier($type);
    }

//    function sms()
//    {
//        return (new Provider\Sms\Sms());
//    }
//
//
//    function mail()
//    {
//        //TODO : Send an Email
//    }

    /**
     * @param User $user
     * @return mixed
     */
    function to(User $user)
    {
        return $this->provider->to($user);
    }

    /**
     * @param $body
     * @return mixed
     */
    function body($body)
    {
        return $this->provider->body($body);
    }

    /**
     * @param null $from
     * @return mixed
     */
    function from($from = null)
    {
        return $this->provider->from($from);
    }

    /**
     * @return mixed
     */
    function send()
    {
        return $this->provider->send();

    }
}
