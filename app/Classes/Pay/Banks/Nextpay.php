<?php


namespace App\Classes\Pay\Banks;


use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class Nextpay extends BaseGateway
{

    function handle($invoice)
    {
        $gateway = $this->getGateway($invoice->gateway_id);
        $bank = $this->getBank();

        $query_param = [
            "api_key" => $gateway->merchant_id,
            "order_id" => $invoice->id,
            "amount" => $invoice->amount,
            "customer_phone" => User::find($invoice->user_id)->mobile,
            "callback_uri" => "http://127.0.0.1:8000/test2",
        ];

        $query_param = http_build_query($query_param);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://nextpay.org/nx/gateway/token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $query_param, //'api_key=&amount=&order_id=&customer_phone=&custom_json_fields={ "productName":"Shoes752" , "id":52 }&callback_uri='
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        $response = json_decode($response);

        if ($response->code != -1 || $response->code != 0) {
            $error = $this->error_message($response->code);
            return $error;
        }

        $Status = $this->error_message($response->code);

        $result = [
            "status" => $Status['error_message'],
            "status_code" => $Status['error_code'],
            "message" => $Status['error_message'],
            "data" => []
        ];

        $invoice->payload = json_encode($result);
        $invoice->bank_result = $Status['error_message'];
        $invoice->save();

        if ($response->code == -1) {
            $data = Redirect::to('https://nextpay.org/nx/gateway/payment/' . $response->trans_id);
        }

    }

    function callback($invoiceId)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://nextpay.org/nx/gateway/verify',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => 'api_key=b11ee9c3-d23d-414e-8b6e-f2370baac97b&amount=74250&trans_id=f7c07568-c6d1-4bee-87b1-4a9e5ed2e4c1',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
    }

    private function error_message($code)
    {
        $error = array(
            '0' => 'پرداخت موفق',
            '-1' => 'تراکنش در وضعیت آماده برای ارسال به بانک است',
            '-2' => 'تراکنش به بانک ارسال شده و درحال پرداخت توسط خریدار است',
            '-3' => 'هنوز پاسخی در خصوص نتیجه تراکنش از بانک دریافت نشده است',
            '-4' => 'تراکنش توسط پرداخت کننده کنسل شده است',
            '-20' => 'کلید مجوزدهی ) key_api ) ارسال نشده است )یا مقدار پارامتر مورد نظر خالی است(',
            '-21' => "شماره تراکنش ) id_trans ) ارسال نشده یا خالی ارسال شده است",
            '-22' => 'مبلغ ) amount ) ارسال نشده است',
            '-23' => 'مسیر بازگشت ) uri_callback ) ارسال نشده است',
            '-24' => 'مقدار عددی مبلغ صحیح نیست',
            '-25' => 'شماره تراکنش )id_trans )دوباره ارسال شده یا قابل پرداخت نیست',
            '-26' => 'شماره تراکنش ) id_trans ) ارسال نشده است',
            '-30' => 'مبلغ کمتر از 100ناموت است',
            '-32' => 'ساختار مسیر بازگشت صحیح نیست',
            '-33' => 'کلید مجوزدهی ) key_api ) صحیح نیست',
            '-34' => 'شماره ترا کنش )id_trans )صحیح نیست',
            '-35' => 'نوع کلید مجوزدهی )مانند لینک، مستقیم و ...(صحیح نیست',
            '-36' => 'شماره سفارش ) id_order ) ارسال نشده یا بیش از 32 کاراکتر است',
            '-37' => 'تراکنش موجود نیست',
            '-38' => 'شماره توکن یافت نشد',
            '-39' => 'کلید مجوزدهی یافت نشد',
            '-40' => 'کلید مجوزدهی مسدود شده است',
            '-41' => 'پارامتر های ارسالی از طرف بانک صحیح نیست',
            '-42' => 'سیستم پرداخت در نکست پی دچار مشکل شده است',
            '-43' => 'درگاه پرداختی برای انجام روال بانکی یافت نشده است',
            '-44' => 'بانک عامل پاسخگو نبوده است',
            '-45' => 'سیستم پرداخت در نکست پی غیر فعال شده است',
            '-46' => 'درخواست ارسالی اشتباه است یا در نکست پی تعریف نشده است',
            '-48' => 'نرخ کمیسیون تعیین نشده است',
            '-49' => 'تراکنش یکبار انجام شده و دوباره قابل انجام نیست',
            '-50' => 'حساب کاربری یافت نشد',
            '-51' => 'کاربری در سیستم یافت نشد',
        );

        if (array_key_exists("$code", $error)) {
            return [
                "error_code" => $code,
                "error_message" => $error["$code"]
            ];
        } else {
            return "خطای نامشخص هنگام اتصال به درگاه زرین پال";
        }

    }
}
