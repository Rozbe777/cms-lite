<?php


namespace App\Classes\Responses\Auth;


class Responses
{
    public function success($message, $data = [])
    {
        if (!str_contains(\Route::current()->uri, 'api') && $data == 'register') {
            return adminView("pages.dashboard.index")->with($message);
        }
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
        if (!str_contains(\Route::current()->uri, 'api') && $data == 'register') {
            return adminView('pages.auth.login')->with(__('message.auth.register.error'));
        }
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
