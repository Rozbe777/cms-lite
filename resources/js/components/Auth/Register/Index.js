import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import './_shared/style.scss';
import {Request} from "../../../services/AuthService/Api";
import VerifyPhone from "./VerifyPhone";
import {error as ErrorToast, success as SuccessToast} from './../../../helper';
import Loading from "../Loading";
import FinalDataRegister from "./FinalDataRegister";

const Index = (props) => {
    useEffect(() => {
        $("input[name=code_1]").focus();
    }, [])


    let timerString = "";
    var pattern = /0?9([0-9]{9})/;
    let CounterTimer = 0;
    const [responseVerify, setResponseVerify] = useState(0);
    const [intervals, setIntervalId] = useState();
    const [isInvalid, setIsInvalid] = useState(false);
    const {token} = props;
    const [phone, setPhone] = useState();
    const [response, setResponse] = useState();
    let elementLoading = document.getElementById("loading-show")

    const [verifyCode, setVerifyCode] = useState({
        verifyCode : ''
    });

    const HandlePhone = (e) => {
        e.preventDefault();
        setPhone({
            mobile: e.target.value
        })
    }

    const RegisterPhone = (e) => {
        e.preventDefault();

        let phones = {...phone};
        if (pattern.test(phones.mobile)) {
            phones._token = token;
            ReactDOM.render(<Loading/>, elementLoading);
            Request.RegisterPhone(phones)
                .then(response => {
                    clearInterval(intervals);
                    Timer(e, 120)
                    ReactDOM.render('', elementLoading);
                    $(".container-loader").fadeIn();
                    setTimeout(() => {
                        $(".verifyForm").addClass("active");
                    }, 500)
                    // VerifyModal(e, 120)
                }).catch((error) => {
                // Error

                if (error.response) {
                    clearInterval(intervals);
                    ReactDOM.render('', elementLoading);
                    if (error.response.data.data) {
                        Timer(e, error.response.data.data)
                        $(".container-loader").fadeIn();
                        setTimeout(() => {
                            $(".verifyForm").addClass("active");
                        }, 500)
                    } else {
                        ErrorToast("این شماره تلفن ثبت نام شده است . میتوانید بازگردانی پسورد بزنید")
                    }

                } else if (error.request) {

                } else {
                    console.log('Error', error.message);
                }
            });
        } else {
            ErrorToast("فرمت شماره تلفن صحیح نمیباشد");
        }
    }


    const Timer = (e, timers) => {

        e.preventDefault()
        var min = Math.floor(timers / 60);
        var sec = Math.floor(timers - (min * 60));

        if (intervals) {
            clearInterval(intervals);
        }

        let elementTimer = document.getElementById("timersPop");

        var intervalsId = setInterval(function () {
            if (min == 0 && sec == 0) {
                clearInterval(intervals);
                elementTimer.innerHTML = "";
                elementTimer.innerHTML = "مجددا جهت دریافت کد اقدام فرمایید";
            } else {
                if (sec == 0) {
                    min--;
                    sec = 60;
                }
                sec--;
                elementTimer.innerHTML = "0" + min + ":" + sec + " تا انقضای کد ارسالی";
            }
            // elementTimer.innerHTML = stringis;
        }, 1000)

        setIntervalId(intervalsId)

    }

    let loadingElement = document.getElementById("loading-shows");

    var body = $("#wrapper");

    // check kardan daryaft number dar inputhai verify code , paresh be input badi
    function goToNextInput(e) {
        var key = e.which,
            t = $(e.target),
            sib = t.next("input");
        if (key != 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
        }
        if (key === 9) {
            return true;
        }
        if (!sib || !sib.length) {
            sib = body.find("input").eq(0);
        }
        sib.select().focus();
    }

    // check kardan vard shodan number baray raftan be input badi
    function onKeyDown(e) {
        var key = e.which;
        if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
        }
        e.preventDefault();
        return false;
    }

    // check kardan focus in input
    function onFocus(e) {
        $(e.target).select();
    }

    // transaction hai input
    body.on("keyup", "input", goToNextInput);
    body.on("keydown", "input", onKeyDown);
    body.on("click", "input", onFocus);


    const checkCode = (e) => {
        e.preventDefault();
        let code = parseInt(verifyCode.verifyCode);
        let data = {
            token: code,
            _token: token
        }
        ReactDOM.render(<Loading/>, loadingElement);
        Request.VerifyCodeCheck(data)
            .then(response => {
                ReactDOM.render('', loadingElement);
                console.log("success : ", response)
                if (response.data.http_code == 200) {
                    SuccessToast("تایید شماره تلفن موفقیت آمیز بود. کمی صبر کنید...")
                    setTimeout(() => {
                        clearInterval(intervals);
                        ReactDOM.render(<FinalDataRegister token={token}
                                                           id={response.data.data.id}/>, document.getElementById("register-form"));
                    }, 600)
                }
            }).catch(error => {
            if (error.response.data.http_code == 404) {
                ReactDOM.render('', loadingElement);
                ErrorToast("کد را به صورت صحیح وارد کنید")
            }
        })
    }


    function checkVerifyNumber(str) {
        if (typeof str != "string") return false
        return !isNaN(str) &&
            !isNaN(parseFloat(str))
    }


    const verifyCodeGet = (e) => {
        e.preventDefault();
        if (verifyCode.verifyCode.length < 4){
            setVerifyCode({
                [e.target.name]: e.target.value
            })
        }

    }

    const checkButton = () => {
        let numberReg = /^\d+$/;
        if(verifyCode){
            if (numberReg.test(verifyCode.verifyCode)) {
                if (verifyCode.verifyCode.length == 4) {
                    return (
                        <button className={"btn btn-primary"} style={{fontSize: '11px'}} onClick={e => checkCode(e)}>بررسی
                            کد</button>
                    )
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }else{
            ErrorToast("کد تایید کامل نیست")
        }


    }

    const closeModal = e => {
        e.preventDefault();
        clearInterval(intervals);

        $(".verifyForm").removeClass("active");
        setTimeout(() => {
            $(".container-loader").fadeOut();
        }, 500)
    }


    return (
        <>
            <div style={{position: 'relative'}}
                 className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                <div className="card-header pb-1">
                    <div className="card-title">
                        <h4 className="text-center mb-2">خوش آمدید</h4>
                    </div>
                </div>


                <div className="card-content">
                    <div className="card-body">

                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">
                                شماره تلفن خود را وارد کنید
                            </label>
                            <input type="text" className="form-control text-left"
                                   id="username"
                                   autocomplete="one-time-code"
                                   onChange={e => HandlePhone(e)}
                                   name="mobile"
                                   placeholder="شماره تلفن" dir="ltr"/>


                            <button type="submit"
                                    onClick={e => RegisterPhone(e)}
                                    style={{marginTop: 15}}
                                    className="btn btn-primary glow w-50 position-relative">{CounterTimer > 0 ? "دریافت مجدد کد تایید" : "دریافت کد تایید"}</button>
                        </div>
                        <div>
                            <small className="mr-25">قبلا ثبت نام کرده اید؟</small>
                            <a href={"/login"} style={{borderBottom: '1px dashed', cursor: 'pointer'}}><small>ورود به
                                پنل</small></a>
                        </div>
                    </div>
                </div>


                <div id={"loading-show"}>

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

                                <p>کد تایید را وارد کنید</p>


                                <div className={"col-12"} style={{display : 'flex' , alignItem : 'center' , justifyContent : 'center'}}>
                                    <div className={"verify-code-check"}>
                                        <input type={"text"}
                                               className={"form-control " + isInvalid == true ? "is-invalid" : ""}
                                               name={"verifyCode"}
                                               pattern="([0-9]|[0-9]|[0-9]|[0-9])"
                                               onChange={e => verifyCodeGet(e)}
                                               maxlength ="4"
                                               placeholder={"کد تایید"}/>
                                    </div>
                                </div>


                                {checkButton()}
                                <div id={"timersPop"}></div>

                                <div id={"loading-shows"}>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Index;


let element = document.getElementById("register-form")
if (element) {
    var Props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index {...Props} />, element)
}
