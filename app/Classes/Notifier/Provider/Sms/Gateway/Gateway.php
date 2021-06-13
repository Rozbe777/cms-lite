<?php


namespace App\Classes\Notifier\Provider\Sms\Gateway;


abstract class Gateway
{
    private $username, $password, $from, $to, $body, $url;
    private $prefixConfigPath = 'notifier.providers.sms';

    /**
     * @param mixed $to
     */
    public function setTo($to)
    {

        $this->to = $to;
        return $this;
    }

    /**
     * @param mixed $body
     */
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @return mixed
     */
    public function getFrom()
    {
        return $this->from;
    }

    /**
     * @return mixed
     */
    public function getTo()
    {
        return $this->to;
    }

    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }

    public function __construct()
    {
        $this->getGateway();
    }

    private function getGateway()
    {
        $defaultGateway = config("$this->prefixConfigPath.default_gateway");
        $gateway = config("$this->prefixConfigPath.gateway.$defaultGateway");
        $this->username = $gateway['username'];
        $this->password = $gateway['password'];
        $this->from = $gateway['from'];
        $this->url = $gateway['url'];
    }

    function send()
    {
        return $this->handle();
    }

    abstract function handle();
}
