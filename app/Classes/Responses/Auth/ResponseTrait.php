<?php


namespace App\Classes\Responses\Auth;


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


    public function isAxios(): bool
    {
        if (!empty(request()->header('is_axios'))) {
            return true;
        }
        return false;
    }

    public function success($status = 200)
    {
        if ($this->isAxios()) {
            return
                response()->json([
                    "http_code" => $status,
                    "message" => $this->message,
                    "data" => $this->data
                ], $status);
        } else {
            return adminView($this->view);
        }

    }

    public function error($status = 404)
    {
        if ($this->isAxios()) {
            return
                response()->json([
                    "message" => $this->message,
                    "errors" => [
                        'data' => [$this->data],
                    ],
                ],$status);
        } else {
            return adminView($this->view);
        }

    }
}
