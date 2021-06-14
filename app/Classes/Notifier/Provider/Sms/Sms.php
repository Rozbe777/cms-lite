<?php


namespace App\Classes\Notifier\Provider\Sms;


use App\Classes\Notifier\iNotifier;
use App\Classes\Notifier\iUser;
use App\Jobs\SendNotifier;
use App\Models\User;
use Kavenegar;
use function Symfony\Component\Translation\t;

class Sms implements iNotifier
{
    private $to, $body;
    private $prefixConfigPath = 'notifier.providers.sms';

    function to(iUser $user)
    {
        $this->to = $user;
        return $this;
    }

    function body($body)
    {
        $this->body = $body;
        return $this;
    }

    function from($from = null)
    {
        return $from;
    }

    function send()
    {
        $defaultGateway = config("$this->prefixConfigPath.default_gateway");
        $gateway = config("$this->prefixConfigPath.gateway.$defaultGateway");
        $className = $gateway['class'];

        if (!is_array($this->body)) {
            $body = [
                $gateway['body'],
                $this->body
            ];
        }

        dispatch(new SendNotifier($className,$this->to,$body));
//        return (new $className())->setTo($this->to)->setBody($this->body)->handle();
    }
}
