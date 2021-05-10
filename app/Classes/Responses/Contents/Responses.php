<?php


namespace App\Classes\Responses\Contents;


class Responses
{
    public function success($data,$view)
    {
        if (str_contains(\Route::current()->uri,'api')){
            return response()->json([
                'data' => $data
            ]);
        }else{
            return adminView("pages.admin.content.$view",['data'=>$data]);
        }
    }

    public function notSuccess($statusCode,$data=[],$message=[])
    {
            return response()->json([
                'message' => __('message.errors.500'),
                "data"=>$data
            ],$statusCode);
    }
}
