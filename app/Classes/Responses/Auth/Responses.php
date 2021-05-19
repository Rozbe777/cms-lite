<?php


namespace App\Classes\Responses\Auth;


class Responses
{
    public function success($message, $data = [])
    {
        if (str_contains(\Route::current()->uri, 'api')) {
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
        } else {
            return adminView("pages.admin.dashboard.index");
        }
    }

    public function notSuccess($message, $status, $data = [])
    {
        if (str_contains(\Route::current()->uri, 'api')) {
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
        }else{
            return adminView('pages.auth.login');
        }

    }
}
