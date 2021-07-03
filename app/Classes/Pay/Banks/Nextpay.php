<?php


namespace App\Classes\Pay\Banks;


use App\Models\Invoice;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Nyholm\Psr7\Request;

class Nextpay extends BaseGateway
{

    function handle($invoice)
    {
        $gateway = $this->getGateway($invoice->gateway_id);
        $bank = $this->getBank();
        $bankPayload = json_decode($bank->payload);

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
            CURLOPT_URL => $bankPayload->request_url,
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

        if (!in_array($response->code,[-1,0])) { //we have faced error
            $Status = $this->check_status($response->code);

            $result = array(
                "status" => $Status['message'],
                "status_code" => $Status['code'],
                "message" => $Status['message'],
                "data" => [
                    "startPay" => '',
                    "authority" => ''
                ]
            );
            return $result;
        }

        $Status = $this->check_status($response->code);
        $StartPayUrl = $bankPayload->pay_url . $response->trans_id;

        $result = array(
            "status" => $Status['message'],
            "status_code" => $Status['code'],
            "message" => $Status['message'],
            "data" => [
                "startPay" => $StartPayUrl,
                "authority" => $response->trans_id
            ]
        );

        $invoice->payload = json_encode($result);
        $invoice->bank_result = $Status['message'];
        $invoice->save();

        return $result;
    }

    function callback($invoiceId)
    {
        $invoice = Invoice::find($invoiceId);
        $gateway = $this->getGateway($invoice->gateway_id);
        $bank = $this->getBank();
        $bankPayload = json_decode($bank->payload);
        $authority = request('trans_id');

        $query_param = [
            'api_key'  => $gateway->merchant_id,
            'amount'   => $invoice->amount,
            'trans_id' => $authority,
        ];

        $query_param = http_build_query($query_param);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $bankPayload->verify_url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $query_param,
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        $this->verify($response);

        return $response;
    }

    public function verify($response)
    {
        $response = json_decode($response);
        $invoice = Invoice::find($response->order_id);

        $status = $this->check_status($response->code);
        $result = [
            'user_id'=> $invoice->user_id,
            'transaction_type_id' => 1,
            'amount' => $response->amount,
            'description' => $status->message,
            'payload' => json_encode([
                'card_holder' => $response->card_holder,
                'customer_phone' => $response->customer_phone,
                'Shaparak_Ref_Id' => $response-Shaparak_Ref_Id,
                'custom' => $response->custom
            ])
        ];

        $transaction = Transaction::create($result);

        return $result;
    }

    private function check_status($code) //error_message
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
                "code" => $code,
                "message" => $error["$code"]
            ];
        } else {
            return "خطای نامشخص هنگام اتصال به درگاه زرین پال";
        }
    }


}
