import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'

export const Header = (props) => {
    useEffect(() => {
    }, [])
    const {selected} = props;
    const [state, setState] = useState();
    return (
        <ul className={"checkout-header"}>
            <li className={selected == "check" || selected == "sendDetail" || selected == "payType" || selected == "finishPay"  ? "active" : ""}>
                <div id={"contents"}>
                    <i className={"bx bx-cart"}></i> بررسی سبد خرید
                </div>
            </li>
            <li className={selected == "sendDetail" || selected == "payType" || selected == "finishPay"  ? "active" : ""}>
                <div id={"line"} className={selected == "sendDetail" || selected == "payType" || selected == "finishPay" ? "active" : ""}></div>
                <div id={"contents"}>
                    <i className={"bx bx-truck"}></i> اطلاعات ارسال
                </div>
            </li>
            <li className={selected == "payType" || selected == "finishPay" ? "active" : ""}>
                <div id={"line"} className={selected == "payType" || selected == "finishPay" ? "active" : ""}></div>
                <div id={"contents"}>
                    <i className={"bx bx-wallet"}></i> نحوه پرداخت
                </div>
            </li>
            <li className={selected == "finishPay" ? "active" : ""}>
                <div id={"line"} className={selected == "finishPay" ? "active" : ""}></div>
                <div id={"contents"}>
                    <i className={"bx bx-check-circle"}></i> پایان خرید
                </div>
            </li>
        </ul>
    )
}

