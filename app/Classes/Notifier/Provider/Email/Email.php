<?php


namespace App\Classes\Notifier\Provider\Email;


use App\Classes\Notifier\iNotifier;
use App\Models\User;

class Email implements iNotifier
{

    /**
     * @param User $user
     * @return mixed
     */
    function to(User $user)
    {
        // TODO: Implement to() method.
    }

    /**
     * @param $body
     * @return mixed
     */
    function body($body)
    {
        // TODO: Implement body() method.
    }

    /**
     * @param null $from
     * @return mixed
     */
    function from($from = null)
    {
        // TODO: Implement from() method.
    }

    /**
     * @return mixed
     */
    function send()
    {
        return ' email sent!';
    }
}
