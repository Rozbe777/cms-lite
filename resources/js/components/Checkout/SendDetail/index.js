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
import {CheckoutApi} from "../Api/CheckoutApi";
import {error as ErrorToas, empty, ErroHandle, success, separate} from "../../../helper";
import $ from "jquery";
import Loading from "../../Auth/Loading";

const SendDetail = (props) => {
    useEffect(() => {
    }, [])

    let CounterTimer = 0;
    const {cartInvoice, totalPrice, attributesData, checkAuth, transform} = props;
    const [loading, setLoading] = useState(false);
    const [intervals, setIntervalId] = useState();
    const [tokenCode, setTokenCode] = useState();
    const [verifyMobileStatus, setVerifyMobileStatus] = useState(false);
    const [addressState, setAddressState] = useState({
        name: null,
        last_name: null,
        email: null,
        phone: null,
        postal_code: null,
        state: null,
        city: null,
        address: null,
        mobile: null,
        _token: TOKEN
    });
    let checkoutApi = new CheckoutApi();
    const [discount, setDiscount] = useState();
    const [transfer , setTransfer] = useState(1)
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


    const Timer = (e, timers) => {

        e.preventDefault()
        let min = Math.floor(timers / 60);
        let sec = Math.floor(timers - (min * 60));

        if (intervals) {
            clearInterval(intervals);
        }

        let elementTimer = document.getElementById("timersPop");

        let intervalsId = setInterval(function () {
            if (min == 0 && sec == 0) {
                clearInterval(intervals);
                elementTimer.innerHTML = "";
                elementTimer.innerHTML = "?????????? ?????? ???????????? ???? ?????????? ??????????????";
            } else {
                if (sec == 0) {
                    min--;
                    sec = 60;
                }
                sec--;
                elementTimer.innerHTML = "0" + min + ":" + sec + " ???? ???????????? ???? ????????????";
            }
        }, 1000)

        setIntervalId(intervalsId)

    }


    const onChange = e => {
        e.preventDefault();
        setAddressState({
            ...addressState,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault();


        document.querySelector(".back-loading").classList.add("active");
        if (!addressState.name) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ?????? ???????????? ???? ????????")
        }
        if (empty(addressState.last_name)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ?????? ???????????????? ???????????? ???? ????????")
        }
        if (empty(addressState.mobile)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ???????? ?????????? ???????????? ???? ????????")
        }
        if (empty(addressState.city)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ?????? ?????? ???????????? ???? ????????")
        }
        if (empty(addressState.state)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ?????? ?????????? ???????????? ???? ????????")
        }
        if (empty(addressState.address)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("????????  ???????? ???????????? ???? ????????")
        }
        if (empty(addressState.phone)) {
            document.querySelector(".back-loading").classList.remove("active");
            ErrorToas("???????? ???????? ???????? ???????????? ???? ????????")
        }

        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!empty(addressState.email)) {
            if (!emailPattern.test(String(addressState.email).toLowerCase())) {
                document.querySelector(".back-loading").classList.remove("active");
                ErrorToas("?????????? ???? ???? ?????????? ???????? ????????")
            }
        }

        let pattern = /^0?9{1}([0-9]{9})$/;
        if (!empty(addressState.mobile)) {
            if (!pattern.test(addressState.mobile)) {
                document.querySelector(".back-loading").classList.remove("active");
                ErrorToas("???????? ???????? ?????????? ???????? ?????? ????????")
            }
        }

        addressState.transport_id = transfer;

        checkoutApi._storeData = addressState;
        if (!empty(addressState.name) && !empty(addressState.last_name) && !empty(addressState.state) && !empty(addressState.city) && !empty(addressState.mobile) && !empty(addressState.phone) && !empty(addressState.address)) {
            if (pattern.test(addressState.mobile) && finalCheckEmail()) {
                setLoading(true)
                checkoutApi.store().then(response => {
                    setLoading(false)
                    document.querySelector(".back-loading").classList.remove("active");
                    success("?????????????? ?????? ???? ???????????? ?????? ????");
                }).catch(error => {

                    document.querySelector(".back-loading").classList.remove("active");
                    ErroHandle(error.response.data.errors);
                })
            }

        }


    }

    const finalCheckEmail = () => {
        let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (addressState.email) {
            if (emailPattern.test(String(addressState.email).toLowerCase())) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    const handleStateName = (StateName) => {
        let addressStateClone = {...addressState};
        addressStateClone.state = StateName;
        setAddressState(addressStateClone)
    }

    const handleCityName = (cityName) => {
        let addressStateClone = {...addressState};
        addressStateClone.city = cityName;
        setAddressState(addressStateClone)
    }


    let loadingElement = document.getElementById("loading-shows");

    const closeModal = e => {
        e.preventDefault();
        clearInterval(intervals);
        $(".verifyForm").removeClass("active");
        setTimeout(() => {
            $("input[name=verifyCode]").val('')
            $(".container-loader").fadeOut();
        }, 500)
    }

    const verifyCodeGet = e => {
        e.preventDefault();
        setTokenCode(e.target.value)
    }

    const checkCode = e => {
        e.preventDefault();
        ReactDOM.render(<Loading/>, loadingElement);

        checkoutApi._mobileToken = tokenCode;
        checkoutApi._userMobile = addressState.mobile;
        checkoutApi.verifyMobileToken().then(response => {
            setVerifyMobileStatus(true)
            success("???????? ?????? ?????????? ????")
            setTimeout(() => {
                ReactDOM.render('', loadingElement);
                $(".container-loader .verifyForm").removeClass("active");
                setTimeout(() => {
                    $(".container-loader").fadeOut();
                }, 500)
            }, 600)

        }).catch(e => {
            ReactDOM.render('', loadingElement);
            ErroHandle(e.response.data.errors);
        })
    }

    const onCheckMobile = e => {
        e.preventDefault();
        setLoading(true);
        let pattern = /^0?9{1}([0-9]{9})$/;
        if (empty(addressState.mobile)) {
            ErrorToas("???????? ?????????? ???????? ?????????? ???????? ???? ????????")
        }

        if (!empty(addressState.mobile)) {
            if (!pattern.test(addressState.mobile)) {
                document.querySelector(".back-loading").classList.remove("active");
                ErrorToas("???????? ???????? ?????????? ???????? ?????? ????????")
            }
        }

        checkoutApi._userMobile = addressState.mobile;
        checkoutApi.verifyMobile().then(response => {
            setLoading(false);
            if (response.data.http_code) {
                Timer(e, parseInt(response.data.data))
            } else {
                Timer(e, 120)
            }
            $(".container-loader").fadeIn();
            setTimeout(() => {
                $(".container-loader .verifyForm").addClass("active");
            }, 500)
        }).catch(error => {
            {/*   TODO : check error result   */
            }
            ErroHandle(error.response.data.errors);
        })
    }


    $("input[name=transfer]").change(function () {
        $(this).closest("div").addClass("active");
    })


    const radioOnChanged = e => {
        setTransfer(e.target.name);
    }
    return (
        <>
            <Header selected={"sendDetail"}/>
            <div className={"container-fluid"}>

                <div className={"back-loading"}>
                    <div className="spinner-border spinner-border-lg" role="status">
                        <span className="sr-only">???? ?????? ???????????????? ...</span>
                    </div>
                </div>

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
                                <div className={discount ? "btn-dis active" : 'btn-dis'}>?????????? ??????????</div>

                            </div>


                            <ul className={"show-det-carta"}>
                                <li>
                                    <ul>
                                        <li>???????? ???? ?????? ???????? :</li>
                                        <li>{_renderTotalPrice()}</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>?????????? ?????????? :</li>
                                        <li>?????????? ???????? ?????? ????????</li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>???????? ???????? ???????????? :</li>
                                        <li style={{color: '#000', fontWeight: 'bold'}}>{_renderTotalPrice()}</li>
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
                                            <TextInput title={"??????"} type={"text"} name={"name"}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className="col-md-3 col-sm-12">
                                            <TextInput title={"?????? ????????????????"} type={"text"} name={"last_name"}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <TextInput title={"??????????"} type={"email"} name={"email"}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className="col-md-8 col-sm-12">
                                            <City handleStateName={handleStateName} handleCityName={handleCityName}/>
                                        </div>
                                        <div className={"col-md-4 col-sm-12"}>
                                            <TextInput title={"???? ????????"} type={"number"} name={"postal_code"}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className={"col-md-6 col-sm-12"}>
                                            <TextInput title={"?????????? ????????????"} type={"number"} name={"mobile"}
                                                       disabled={verifyMobileStatus}
                                                       onChange={onChange}/>
                                        </div>

                                        <div className={"col-md-6 col-sm-12"}>
                                            <TextInput title={"???????? ????????"} type={"number"} name={"phone"}
                                                       onChange={onChange}/>
                                        </div>

                                        <div className={"col-12"}>
                                            <TextInput title={"???????? ????????"} type={"text"} name={"address"}
                                                       onChange={onChange}/>
                                        </div>
                                        <div className={"col-12"}>
                                            <TextInput title={"?????????????? ( ?????????????? )"} type={"text"} name={"description"}
                                                       placeholder={"???????????? ???? ???????? ?????? ???? ?????????? ???? ?????????? ???????? ????????"}
                                                       onChange={onChange}/>
                                        </div>


                                        {JSON.parse(props.transform).map((item , index) => (<div key={index} className={"col-12"}>
                                                    <div className={transfer == item.id ? 'send-type active' : 'send-type'}>
                                                        <input type={"checkbox"} name={item.id} checked
                                                               onChange={e => radioOnChanged(e)}/>
                                                        <i className={transfer == item.id ? "bx bxs-check-circle checkeds active" : "bx bxs-check-circle checkeds"}></i>
                                                        <i className={`bx ${item.icon} icon-sycle`}></i>
                                                        <p>{item.title}</p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className={"container-loader"}>
                <div className={"container"} style={{height: '100%'}}>
                    <div className="row justify-content-center align-items-center" style={{height: '100%'}}>
                        <div className="col-md-4 col-sm-10">
                            <div className={"verifyForm"}>

                            <span id={"close-icon"} onClick={e => closeModal(e)}>
                                <i className={"bx bx-x"}></i>
                            </span>

                                <p>???? ?????????? ???? ???????? ????????</p>


                                <div className="alert border-success alert-dismissible mb-2" role="alert"
                                     id={"customAlert"}>
                                    <div className="d-flex align-items-center">
                                        <span>
???? ?????????? ???? ?????????? ???????? ?????????? {addressState.mobile ? addressState.mobile : ''} ?????????? ????.
                </span>
                                    </div>
                                </div>


                                <div className={"col-12"}
                                     style={{display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
                                    <div className={"verify-code-check"}>
                                        <input type={"text"}
                                               className={"form-control"}
                                               name={"verifyCode"}
                                               maxLength={4}
                                               min="1000"
                                               max="9999"
                                               autoComplete={"none"}
                                               onChange={e => verifyCodeGet(e)}
                                               placeholder={"???? ?????????? ???? ???????? ????????"}/>
                                    </div>
                                </div>


                                <button className={"btn btn-primary"} id={"verifyCodessss"} style={{fontSize: '11px'}}
                                        onClick={e => checkCode(e)}>??????????
                                    ????
                                </button>


                                <div id={"timersPop"}></div>

                                <div id={"loading-shows"}>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={"col-12"} style={{marginTop: '30px', padding: 0}}>

                {_renderButtonSubmit()}
                <button onClick={e => handlePrev(e)}
                        style={{float: 'right', background: '#fff', fontSize: '16px', fontWeight: 100}}
                        className={"btn"}><i className={"bx bx-chevron-right"}></i> ?????????? ?????? ????????
                </button>
            </div>

        </>
    )


    function _renderTotalPrice() {
        let typePrice = " ?????????? ";
        return separate(props.cartInvoice[0].totalPrice) + typePrice;
    }


    function _renderButtonSubmit() {
        if (verifyMobileStatus) {
            if (!loading) {
                return (
                    <button onClick={e => onSubmitForm(e)} style={{float: 'left', fontSize: '16px', fontWeight: 100}}
                            className={"btn btn-primary"}> ?????? ??????????<i className={"bx bx-chevron-left"}></i></button>
                )
            } else {
                return (
                    <button className="btn btn-primary mb-1" type="button" disabled="true"
                            style={{float: 'left', fontSize: '16px', fontWeight: 100}}>
                        <span className="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"></span>&nbsp;&nbsp;
                        ?????????? ??????????????...
                    </button>
                )
            }
        } else {
            if (!loading) {
                return (
                    <button onClick={e => onCheckMobile(e)} style={{float: 'left', fontSize: '16px', fontWeight: 100}}
                            className={"btn btn-primary"}> ?????? ??????????<i className={"bx bx-chevron-left"}></i></button>
                )
            } else {
                return (
                    <button className="btn btn-primary mb-1" type="button" disabled="true"
                            style={{float: 'left', fontSize: '16px', fontWeight: 100}}>
                        <span className="spinner-border spinner-border-sm" role="status"
                              aria-hidden="true"></span>&nbsp;&nbsp;
                        ?????????? ????????...
                    </button>
                )
            }
        }

    }
}

export default SendDetail;
