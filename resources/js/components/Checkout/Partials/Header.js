import React, {useState, useEffect} from 'react';

export const Header = (props) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <ul className={"checkout-header"}>
           <li><i className={"bx bx-cart"}></i> بررسی سبد خرید </li>
           <li><i className={"bx bx-truck"}></i> اطلاعات ارسال </li>
           <li><i className={"bx bx-wallet"}></i> نحوه پرداخت </li>
           <li><i className={"bx bx-cart"}></i> پایان خرید </li>
        </ul>
    )
}

