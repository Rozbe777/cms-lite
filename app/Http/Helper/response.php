<?php
/**
 * Created by PhpStorm.
 * User: mohsen1
 * Date: 1/13/19
 * Time: 3:20 PM
 */


if (!function_exists('success')) {
    function success($data = [], $message = null)
    {
        return ['status' => true, 'data' => $data, 'message' => $message];
    }
}

if (!function_exists('error')) {
    function error($message, $data = null)
    {
        return ['status' => false, 'message' => $message, 'data' => $data];
    }
}
