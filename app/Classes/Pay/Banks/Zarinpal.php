<?php


namespace App\Classes\Pay\Banks;


class Zarinpal extends BaseGateway
{

    function callback($invoiceId)
    {

    }
    private function error_message($code, $desc, $cb, $request=false)
    {
        if (empty($cb) && $request === true)
        {
            return "لینک بازگشت ( CallbackURL ) نباید خالی باشد";
        }

        if (empty($desc) && $request === true)
        {
            return "توضیحات تراکنش ( Description ) نباید خالی باشد";
        }


        $error = array(
            "-1" 	=> "اطلاعات ارسال شده ناقص است.",
            "-2" 	=> "IP و يا مرچنت كد پذيرنده صحيح نيست",
            "-3" 	=> "با توجه به محدوديت هاي شاپرك امكان پرداخت با رقم درخواست شده ميسر نمي باشد",
            "-4" 	=> "سطح تاييد پذيرنده پايين تر از سطح نقره اي است.",
            "-11" 	=> "درخواست مورد نظر يافت نشد.",
            "-12" 	=> "امكان ويرايش درخواست ميسر نمي باشد.",
            "-21" 	=> "هيچ نوع عمليات مالي براي اين تراكنش يافت نشد",
            "-22" 	=> "تراكنش نا موفق ميباشد",
            "-33" 	=> "رقم تراكنش با رقم پرداخت شده مطابقت ندارد",
            "-34" 	=> "سقف تقسيم تراكنش از لحاظ تعداد يا رقم عبور نموده است",
            "-40" 	=> "اجازه دسترسي به متد مربوطه وجود ندارد.",
            "-41" 	=> "اطلاعات ارسال شده مربوط به AdditionalData غيرمعتبر ميباشد.",
            "-42" 	=> "مدت زمان معتبر طول عمر شناسه پرداخت بايد بين 30 دقيه تا 45 روز مي باشد.",
            "-54" 	=> "درخواست مورد نظر آرشيو شده است",
            "100" 	=> "عمليات با موفقيت انجام گرديده است.",
            "101" 	=> "عمليات پرداخت موفق بوده و قبلا PaymentVerification تراكنش انجام شده است.",
        );

        if (array_key_exists("{$code}", $error))
        {
            return $error["{$code}"];
        } else {
            return "خطای نامشخص هنگام اتصال به درگاه زرین پال";
        }
    }

    function handle($invoice)
    {
        $gateway = $this->getGateway($invoice->gateway_id);
        $bank = $this->getBank();
        $bankPayload = json_decode($bank->payload);

        $MerchantID = $gateway->merchant_id;
        $Description = empty($invoice->description)?'بدون توضیحات':$invoice->description;
        $CallbackURL = "http://google.com";

        $isSandbox = ($gateway->status == "sandbox") ? "sandbox" : "www";
        $requestUrl = str_replace('{url}',$isSandbox,$bankPayload->request_url);
        $payUrl = str_replace('{url}',$isSandbox,$bankPayload->pay_url);

        $data = array(
            'MerchantID' => $MerchantID,
            'Amount' => $invoice->amount,
            'Description' => $Description,
            'CallbackURL' => $CallbackURL,
        );

        $jsonData = json_encode($data);
        $ch = curl_init($requestUrl);
        curl_setopt($ch, CURLOPT_USERAGENT, 'ZarinPal Rest Api v1');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($jsonData)));

        $result = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        $result = json_decode($result, true);

        if ($err) {
            $Status = 0;
            $Message = "cURL Error #:" . $err;
            $Authority = "";
            $StartPay = "";
            $StartPayUrl = "";
        } else {
            $Status = (isset($result["Status"]) && $result["Status"] != "") ? $result["Status"] : 0;
            $Message = $this->error_message($Status, $Description, $CallbackURL, true);
            $Authority = (isset($result["Authority"]) && $result["Authority"] != "") ? $result["Authority"] : "";
            $StartPay = (isset($result["Authority"]) && $result["Authority"] != "") ? $payUrl . $Authority : "";
            $StartPayUrl = (isset($ZarinGate) && $ZarinGate == true) ? "{$StartPay}/ZarinGate" : $StartPay;
        }

        return array(
            "Node" => "{$isSandbox}",
            "Method" => "CURL",
            "Status" => $Status,
            "Message" => $Message,
            "StartPay" => $StartPayUrl,
            "Authority" => $Authority
        );

    }
}
