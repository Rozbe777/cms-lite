<?php


namespace App\Classes\Responses\Auth;


class Responses
{
    public function success($message, $data = [])
    {
        return ($data != null) ?
            response()->json([
                "http_code" => 200,
                "message" => $message,
                "data" =>$data
            ], 200) :
            response()->json([
                "http_code" => 200,
                "message" => $message,
            ], 200);
    }

    public function notSuccess($message, $status, $data = [])
    {
        return ($data != null) ?
            response()->json([
                "http_code" => $status,
                "message" => $message,
                "data" => $data
            ], $status) :
            response()->json([
                "http_code" => $status,
                "message" => $message,
            ], $status);
    }
}
