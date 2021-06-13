<?php


namespace App\Classes\Notifier\Provider\Sms;


use App\Classes\Notifier\iNotifier;
use App\Models\User;
use Kavenegar;
use function Symfony\Component\Translation\t;

class Sms implements iNotifier
{
    private $to, $body;
    private $prefixConfigPath = 'notifier.providers.sms';

    function to(User $user)
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

        return (new $className())->setTo($this->to)->setBody($this->body)->handle();


        //(new Kavenegar\KavenegarApi(config('kavenegar.apikey')))->VerifyLookup('0'.$input[0], $input[1], '', '', config('kavenegar.template'));
    }
}
