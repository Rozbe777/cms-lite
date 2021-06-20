<?php


namespace App\Classes\Payment\Provider\Online;


use App\Classes\Payment\BaseBank;
use App\Classes\Payment\iBank;

class Pay extends BaseBank implements iBank
{
    public function __construct()
    {
        $this->name = "mamad";
    }

    function startPayment()
    {
        $MerchantID = $this->merchantId();
        $Amount = 100;
        $Description = "فروش محصول از طریق درگاه زرین پال";
        $gateway = 'zarinpal';
        $Email = "";
        $Mobile = "";
        $CallbackURL = url("payment/$gateway/order");
        $ZarinGate = false;
        $SandBox = true;

        $zp = new ZarinpalFunction();
        $result = $zp->request($MerchantID, $Amount, $Description, $Email, $Mobile, $CallbackURL, $SandBox, $ZarinGate);

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
        $MerchantID = "00000000-0000-0000-0000-000000000000";
        $Amount = 100;
        $ZarinGate = false;
        $SandBox = true;

        $zp = new ZarinpalFunction();
        $result = $zp->verify($MerchantID, $Amount, $SandBox, $ZarinGate);

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
