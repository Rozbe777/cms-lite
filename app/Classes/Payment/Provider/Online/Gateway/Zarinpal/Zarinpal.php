<?php


namespace App\Classes\Payment\Provider\Online\Gateway\Zarinpal;


use App\Classes\Payment\BaseBank;

class Zarinpal extends BaseBank
{
    function startPayment()
    {
        $MerchantID = $this->getMerchantId();
        $minAmount = $this->getMinAmount();
        $requestUrl = $this->getRequestUrl();
        $payUrl = $this->getPayUrl();
        $paymentUrl = $this->getPaymentUrl();
        $Amount = 100;
        $Description = config('bank.type.online.gateways.zarinpal.description');
        $gateway = config('bank.type.online.gateways.zarinpal.name');
        $Email = "";
        $Mobile = "";
        $CallbackURL = url(config('bank.type.online.callbackUrl'));
        $ZarinGate = false;
        $SandBox = true;
        $zp = new ZarinpalFunction();
        $result = $zp->request($MerchantID, $Amount, $CallbackURL,$requestUrl,$payUrl ,$paymentUrl, $SandBox, $ZarinGate, $Description, $Email, $Mobile );

        if (isset($result["Status"]) && $result["Status"] == 100) {
            // Success and redirect to pay
            $zp->redirect($result["StartPay"]);
        } else {
            // error
            echo "خطا در ایجاد تراکنش";
            echo "<br />کد خطا : " . $result["Status"];
            echo "<br />تفسیر و علت خطا : " . $result["Message"];
        }
    }

    function callback()
    {
        $MerchantID = $this->getMerchantId();
        $minAmount = $this->getMinAmount();
        $requestUrl = $this->getRequestUrl();
        $verificationUrl = $this->getVerificationUrl();
        $Amount = 100;
        $ZarinGate = false;
        $SandBox = true;

        $zp = new ZarinpalFunction();
        $result = $zp->verify($MerchantID, $requestUrl, $verificationUrl, $Amount, $SandBox, $ZarinGate);

        if (isset($result["Status"]) && $result["Status"] == 100) {
            // Success
            echo "تراکنش با موفقیت انجام شد";
            echo "<br />مبلغ : " . $result["Amount"];
            echo "<br />کد پیگیری : " . $result["RefID"];
            echo "<br />Authority : " . $result["Authority"];
        } else {
            // error
            echo "پرداخت ناموفق";
            echo "<br />کد خطا : " . $result["Status"];
            echo "<br />تفسیر و علت خطا : " . $result["Message"];
        }
    }
}
