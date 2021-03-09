<?php

namespace App\Classes\Setting\Exceptions;

use Exception;

class SettingException extends Exception
{
    /**
     * Report or log an exception.
     *
     * @return void
     */
    public function report()
    {
        \Log::error('setting key not found');
    }
}
