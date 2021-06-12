<?php


namespace App\Classes\Notifier;


use App\Models\User;

interface iNotifier
{
    function to(User $user);

    function body($body);

    function from($from = null);
    function send();
}
