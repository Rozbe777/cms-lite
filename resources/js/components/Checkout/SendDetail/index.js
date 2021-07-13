import React, {useState, useEffect} from 'react';
import {Header} from "../Partials/Header";
import './../_shared/style.scss'
import {TOKEN} from './../../../services/Type';
import './../Partials/city';
import {ItemCheckOutAll} from "../Partials/ItemCheckOutAll";
import {City} from "../Partials/city";
import ReactDOM from "react-dom";
import CheckBascket from "../CheckBascket";
import {TextInput} from "../components/TextInput";

const SendDetail = (props) => {
    useEffect(() => {
    }, [])

    const {cartInvoice, totalPrice, attributesData} = props;
    const [addressState, setAddressState] = useState({
        name : null,
        last_name : null,
        email : null,
        phone : null,
        postal_code : null,
        state : null,
        city : null,
        address : null,
        mobile : null,
        _token : TOKEN
    });
    const [state, setState] = useState();
    const [discount, setDiscount] = useState()
    const handleDis = e => {
        e.preventDefault();
        setDiscount(e.target.value)
    }

    const handleNext = e => {
        e.preventDefault();

        // ReactDOM.render(<SendDetail/>, document.getElementById("mains-content"));
    }
    const handlePrev = e => {
        e.preventDefault();
        ReactDOM.render(<CheckBascket attributes={JSON.stringify(attributesData)} historyTotalPrice={totalPrice}
                                      historyCartData={cartInvoice}/>, document.getElementById("mains-content"));
    }

    const onChange = e => {
        e.preventDefault();
        setAddressState({
            ...addressState,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log("____" , addressState)
    }

    const handleStateName = (StateName) => {
        let addressStateClone = {...addressState};
        addressStateClone.state= StateName;
        setAddressState(addressStateClone)
    }

    const handleCityName = (cityName) => {
        let addressStateClone = {...addressState};
        addressStateClone.city= cityName;
        setAddressState(addressStateClone)
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
                                    {cartInvoice.map(item => (
                                        <div className="col-12" style={{marginBottom: 15}}>
                                            <ItemCheckOutAll {...item} />
                                        </div>
                                    ))}


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
                                        <li>{totalPrice} تومان</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>هزینه ارسال :</li>
                                        <li>ابتدا آدرس ثبت کنید</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>مبلغ قابل پرداخت :</li>
                                        <li style={{color: '#000', fontWeight: 'bold'}}>{totalPrice} تومان</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className={"col-lg-8 col-md-6 col-sm-12"} style={{padding: 5}}>
                        <div className={"cart"} id={"cart-items"}>
                            <form>
                                <div className={"cart-content"}>
                                    <div className={"row"}>
                                        <div className="col-md-3 col-sm-12">
                                            <TextInput title={"نام"} type={"text"} name={"name"} required={true}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className="col-md-3 col-sm-12">
                                            <TextInput title={"نام خانوادگی"} type={"text"} name={"last_name"}
                                                       required={true} onChange={onChange}/>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <TextInput title={"ایمیل"} type={"email"} name={"email"} required={false}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <City handleStateName={handleStateName} handleCityName={handleCityName}/>
                                        </div>
                                        <div className={"col-md-4 col-sm-12"}>
                                            <TextInput title={"کد پستی"} type={"number"} name={"postal_code"} required={false}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className={"col-md-6 col-sm-12"}>
                                            <TextInput title={"شماره موبایل"} type={"tel"} name={"mobile"} required={true}
                                                       onChange={onChange}/>
                                        </div>

                                        <div className={"col-md-6 col-sm-12"}>
                                            <TextInput title={"تلفن ثابت"} type={"tel"} name={"phone"} required={false}
                                                       onChange={onChange}/>
                                        </div>

                                        <div className={"col-12"}>
                                            <TextInput title={"آدرس پستی"} type={"text"} name={"address"} required={false}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className={"col-12"}>
                                            <TextInput title={"توضیحات ( اختیاری )"} type={"text"} name={"description"} required={false} placeholder={"توضیحی که نیاز است در رابطه با سفارش بیان کنید"}
                                                       onChange={onChange}/>
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
                            </form>

                        </div>
                    </div>

                </div>
            </div>

            <div className={"col-12"} style={{marginTop: '30px', padding: 0}}>
                <button onClick={e => onSubmitForm(e)} style={{float: 'left', fontSize: '16px', fontWeight: 100}}
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
