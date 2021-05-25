<?php


namespace App\Classes\Responses\Admin;


trait ResponsesTrait
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


    public function isAxios(): bool
    {
        if (!empty(request()->header('is_axios'))) {
            return true;
        }
        return false;
    }

    public function success($status = 200)
    {
        $data = $this->data;
        if ($this->isAxios()) {
            return
                response()->json([
                    "http_code" => $status,
                    "message" => $this->message,
                    "data" => $this->data
                ], $status);
        } else {
            return adminView($this->view,compact('data'));
        }

    }

    public function error($status = 404)
    {
        if ($this->isAxios()) {
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
        } else {
            return adminView($this->view);
        }

    }
}
