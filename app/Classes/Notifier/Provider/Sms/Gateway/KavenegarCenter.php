<?php


namespace App\Classes\Notifier\Provider\Sms\Gateway;

use Illuminate\Support\Facades\Log;
use Kavenegar;

class KavenegarCenter extends Gateway
{

    function handle()
    {
        $mobile = $this->getTo()->mobile;
        $body = $this->getBody()[0];
        $token1 = empty($this->getBody()[1]) ? '' : $this->getBody()[1];
        $token2 = empty($this->getBody()[2]) ? '' : $this->getBody()[1];
        $token3 = empty($this->getBody()[3]) ? '' : $this->getBody()[1];

        try {
            $response = (new Kavenegar\KavenegarApi($this->getUsername()))->VerifyLookup($mobile, $token1, $token2, $token3, $body);

            Log::channel('notifier.success')->info(
                "Notifier = Kavenegar -- response = ".$response[0]->statustext." //  -- bodyTemplate = ".$this->getBody()[0]." -- token = ".$this->getBody()[1]." -- mobile = ".$this->getTo()->mobile
            );
        } catch (\Exception $exception){

            Log::channel('notifier.error')->info(
                "Notifier = Kavenegar -- response = ".$exception->getMessage()." //  -- bodyTemplate = ".$this->getBody()[0]." -- token = ".$this->getBody()[1]." -- mobile = ".$this->getTo()->mobile
            );
        }


    }
}
