<?php


namespace App\Classes\Responses\Auth;


trait ResponseTrait
{
    private $view, $message = "", $data = [];

    function message($message)
    {
        $this->message = $message;
        return $this;
    }

    function data($data=null)
    {
        $this->data = $data;
        return $this;
    }

    public function success($status = 200)
    {
               return response()->json([
                    "http_code" => $status,
                    "message" => $this->message,
                    "data" => $this->data
                ], $status);
    }

    public function error($status = 404)
    {
            if (!is_array($this->message)) {
                $this->message = [$this->message];
            }
            return
                response()->json([
                    "message" => $this->message[0],
                    "data" => $this->data,
                    "errors" => [
                        'data' => $this->message
                    ],
                ], $status);
    }
}
