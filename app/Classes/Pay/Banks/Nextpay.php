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

        if (json_decode($response)->code == -1){

            $transaction = new Transaction();
            $transaction->user_id = $invoice->user_id;
            $transaction->response_code = json_decode($response)->code;
            $transaction->trans_id = json_decode($response)->trans_id;
            $transaction->transaction_type_id =1;
            $transaction->amount = $invoice->amount;
//            $transaction->description =

            $result = Redirect::to('https://nextpay.org/nx/gateway/payment/'.json_decode($response)->trans_id);
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
}
