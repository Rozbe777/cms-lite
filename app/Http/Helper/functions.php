<?php
/**
 * Created by PhpStorm.
 * User: amin
 * Date: 8/5/19
 * Time: 5:07 PM
 */

/**
 * Return an ApiPack structured response instance
 * @param int http status code
 * @param bool $isSuccess
 * @param array $result
 * @param string|null $description
 * @return mixed
 */
function structuredResponse(int $code, bool $isSuccess, $result = [], string $description = null)
{
    return response()->struct($code, $isSuccess, $result, $description);
}


function structuredError($code, $description = null, $errors = []): \Symfony\Component\HttpFoundation\Response
{
    return response()->struct($code, false, $errors, $description);
}

function structuredSuccess($code = 200, $data = null): \Symfony\Component\HttpFoundation\Response
{
    return structuredResponse($code, true, $data);
}

/**
 * Generate structured response and send headers and contents manually, Then die and finish process
 * @param $code
 * @param $data
 * @param string|null $description
 */
function structuredAbort($code, $data, string $description = null)
{
    // generate Response
    structuredResponse($code, false, $data, $description)
        // send headers and content
        ->sendHeaders()->sendContent();
    // finish process
    die;
}

function respondWithToken($token)
{
    return [
        'access_token' => $token,
        'token_type' => 'bearer',
//        'expires_in' => auth('api')->factory()->getTTL() * 60
    ];
}

/**
 * Send post request and receive response
 * @param $url
 * @param array $data
 * @param bool $header
 * @param array $auth
 * @return mixed array of headers and body
 */
function postRequest($url, $data = array(), $header = false, $auth = [])
{
    if (is_string($data)) {
        $postData = $data;
    } else {
        $postData = '';
        //create name value pairs separated by &
        foreach ($data as $k => $v) {
            if (is_array($v))
                foreach ($v as $_v)
                    $postData .= $k . '[]=' . urlencode($_v) . '&';
            else
                $postData .= $k . '=' . urlencode($v) . '&';

        }
        rtrim($postData, '&');
    }

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_POST, mb_strlen($postData));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_HEADER, 1);

    if (isset($auth["username"]) && isset($auth["password"]))
        curl_setopt($ch, CURLOPT_USERPWD, $auth['username'] . ":" . $auth['password']);
    $response = curl_exec($ch);

    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);

    $result['headers'] = substr($response, 0, $header_size);
    $result['headers'] = explode("\r\n", trim($result['headers']));
    $result['body'] = substr($response, $header_size);

    return $result;
}

function array_flatten($array)
{
    static $newArray = [];
    foreach ($array as $key => $value) {

        if (is_array($value)) {
            array_flatten($value);
        } else {
            $newArray[] = $value;
        }
    }

    return $newArray;
}
