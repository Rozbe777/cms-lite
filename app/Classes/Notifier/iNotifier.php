<?php


namespace App\Classes\Notifier;


use App\Models\User;

interface iNotifier
{
    function to(iUser $user);
    function body(string $body);
    function from($from = null);
    function send();
}
