<?php
/**
 * Created by PhpStorm.
 * User: mohsen1
 * Date: 1/13/19
 * Time: 3:20 PM
 */

use App\Classes\Common\Response\Response;

if (! function_exists('success')) {
    function success($data=[], $message = null) {
        return Response::Instance()->data($data)->success($message);
    }
}

if (! function_exists('error')) {
    function error($message, $data = null) {
        return Response::Instance()->data($data)->error($message);
    }
}
