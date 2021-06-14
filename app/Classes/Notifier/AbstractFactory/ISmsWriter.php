<?php


namespace App\Classes\Notifier\AbstractFactory;


interface ISmsWriter
{
    public function to($mobile);
    public function body($body);
    public function from($from);
    public function send($to,$body,$from);
}
