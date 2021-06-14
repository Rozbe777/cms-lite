<?php


namespace App\Classes\Notifier;


class UserOtp implements iUser
{
    public $mobile,$email;

    public function setMobile($mobile)
    {
        $this->mobile = $mobile;
        return $this;
    }

    public function setEmail($mobile)
    {
        $this->mobile = $mobile;
        return $this;
    }
}
