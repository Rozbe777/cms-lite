import React, {useState, useEffect} from 'react';
import {Header} from "../Partials/Header";
import './../_shared/style.scss'
import './../Partials/city';
import {ItemCheckOutAll} from "../Partials/ItemCheckOutAll";
import {City} from "../Partials/city";
import ReactDOM from "react-dom";
import CheckBascket from "../CheckBascket";

const SendDetail = (props) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    const [discount, setDiscount] = useState()
    const handleDis = e => {
        e.preventDefault();
        setDiscount(e.target.value)
    }

    const handleNext = e => {
        e.preventDefault();
        ReactDOM.render(<SendDetail/>, document.getElementById("mains-content"));
    }
    const handlePrev = e => {
        e.preventDefault();
        ReactDOM.render(<CheckBascket/>, document.getElementById("mains-content"));
    }
    return (
        <>
            <Header selected={"sendDetail"}/>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-lg-4 col-md-6 col-sm-12 right-sides"} style={{padding: 5}}>
                        <div className={"cart"} style={{flex: '1 1 auto'}}>
                            <div className={"cart-content"}>
                                <div className={"row"}>
                                    <div className="col-12" style={{marginBottom: 15}}>
                                        <ItemCheckOutAll/>
                                    </div>
                                    <div className="col-12" style={{marginBottom: 15}}>
                                        <ItemCheckOutAll/>
                                    </div>
                                    <div className="col-12" style={{marginBottom: 15}}>
                                        <ItemCheckOutAll/>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div style={{width: '100%'}}>
                            <div className={discount ? "discounts active" : 'discounts'}>

                                <input type={"text"} onChange={e => handleDis(e)}/>
                                <div className={discount ? "btn-dis active" : 'btn-dis'}>اعمال تخفیف</div>

                            </div>


                            <ul className={"show-det-carta"}>
                                <li>
                                    <ul>
                                        <li>مبلغ کل سبد خرید :</li>
                                        <li>10000000 تومان</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>هزینه ارسال :</li>
                                        <li>12000 تومان</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>مبلغ قابل پرداخت :</li>
                                        <li style={{color: '#000', fontWeight: 'bold'}}>1200000212 تومان</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className={"col-lg-8 col-md-6 col-sm-12"} style={{padding: 5}}>
                        <div className={"cart"} style={{
                            boxShadow: '0 0 5px 2px rgba(0,0,0,0.1)',
                            background: "#fff",
                            borderRadius: '5px',
                            padding: '15px'
                        }}>
                            <div className={"cart-content"}>
                                <div className={"row"}>
                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">نام</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="نام"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">نام خانوادگی</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="نام خانوادگی"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">ایمیل</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="ایمیل"/>
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-sm-12">
                                        <City/>
                                    </div>
                                    <div className={"col-md-4 col-sm-12"}>
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">کد پستی</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="کد پستی"/>
                                        </div>
                                    </div>

                                    <div className={"col-md-6 col-sm-12"}>
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">شماره موبایل</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="شماره موبایل"/>
                                        </div>
                                    </div>

                                    <div className={"col-md-6 col-sm-12"}>
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">تلفن ثابت</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="تلفن ثابت"/>
                                        </div>
                                    </div>

                                    <div className={"col-12"}>
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">آدرس پستی</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="آدرس پستی"/>
                                        </div>
                                    </div>
                                    <div className={"col-12"}>
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">توضیحات ( اختیاری )</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="توضیحی که نیاز است در رابطه با سفارش بیان کنید"/>
                                        </div>
                                    </div>

                                    <div className={"col-12"}>
                                        <div className={"send-type active"}>
                                            <i className={"bx bxs-check-circle checkeds"}></i>
                                            <i className={"bx bx-truck icon-sycle"}></i>
                                            <p>ارسال پستی</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={"col-12"} style={{marginTop: '30px', padding: 0}}>
                <button onClick={e => handleNext(e)} style={{float: 'left', fontSize: '16px', fontWeight: 100}}
                        className={"btn btn-primary"}> نحوه پرداخت <i className={"bx bx-chevron-left"}></i></button>
                <button onClick={e => handlePrev(e)}
                        style={{float: 'right', background: '#fff', fontSize: '16px', fontWeight: 100}}
                        className={"btn"}><i className={"bx bx-chevron-right"}></i> بررسی سبد خرید
                </button>
            </div>

        </>
    )
}

export default SendDetail;
