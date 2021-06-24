<?php


namespace App\Classes\Responses\Front;


trait ResponseTrait
{
    private $view, $message = "", $data = [];

    function view($view)
    {
        $this->view = $view;
        return $this;
    }

    function message($message)
    {
        $this->message = $message;
        return $this;
    }

    function data($data)
    {
        $this->data = $data;
        return $this;
    }

    public function success($status = 200)
    {
        $data = $this->data;

            return
                response()->json([
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
