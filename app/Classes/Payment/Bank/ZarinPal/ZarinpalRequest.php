<?php


namespace App\Classes\Payment\Bank\ZarinPal;


class ZarinpalRequest
{
    public function request()
    {
        $MerchantID = "00000000-0000-0000-0000-000000000000";
        $Amount = 100;
        $Description = "تراکنش زرین پال";
        $Email = "";
        $Mobile = "";
        $CallbackURL = "http://127.0.0.1:8000/dashboard";
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
}

