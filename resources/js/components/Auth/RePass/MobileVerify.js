import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import './../Register/_shared/style.scss';
import {Request} from "../../../services/AuthService/Api";
import {error as ErrorToast,ErroHandle, success as SuccessToast} from './../../../helper';
import PasswordSet from "./PasswordSet";
import Loading from "../Loading";

const MobileVerify = (props) => {
    useEffect(() => {
    }, [])


    var pattern = /^0?9([0-9]{9})$/;
    let CounterTimer = 0;
    const [intervals, setIntervalId] = useState();
    const [isInvalid, setIsInvalid] = useState(false);
    const {token} = props;
    const [phone, setPhone] = useState({
        mobile : ''
    });
    const [response, setResponse] = useState();
    let elementLoading = document.getElementById("loading-show")

    const [verifyCode, setVerifyCode] = useState({
        verifyCode: ''
    });

    const HandlePhone = (e) => {
        e.preventDefault();
        setPhone({
            mobile: e.target.value
        })
    }

    $(function () {
        $("input[name=verifyCode]").keydown(function () {
            if (!$(this).val() || (parseInt($(this).val()) <= 9999 && parseInt($(this).val()) >= 1))
                $(this).data("old", $(this).val());
        });
        $("input[name=verifyCode]").keyup(function () {
            if (!$(this).val() || (parseInt($(this).val()) <= 9999 && parseInt($(this).val()) >= 1))
                ;
            else
                $(this).val($(this).data("old"));
        });
    });

    const RegisterPhone = (e) => {
        e.preventDefault();

        let phones = {...phone};
        if (pattern.test(phones.mobile)) {
            phones._token = token;
            ReactDOM.render(<Loading/>, elementLoading);
            Request.PasswordToken(phones)
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
                    var pattern = /[0-9]/;
                    if (pattern.test(error.response.data.errors.data[0])) {
                        Timer(e, error.response.data.errors.data[0])
                        $(".container-loader").fadeIn();
                        setTimeout(() => {
                            $(".verifyForm").addClass("active");
                        }, 500)
                    } else {
                        if (error.response.data.errors) {
                            ErroHandle(error.response.data.errors)
                        } else {
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }
                    }


                } else if (error.request) {

                } else {

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


    const checkCode = (e) => {
        e.preventDefault();
        let code = parseInt(verifyCode.verifyCode);
        let data = {
            token: code,
            _token: token,
            mobile : phone.mobile
        }

        ReactDOM.render(<Loading/>, loadingElement);
        Request.VerifyCodeCheck(data)
            .then(response => {
                ReactDOM.render('', loadingElement);
                if (response.data.http_code == 200) {
                    SuccessToast("در حال انتقال به تغییر پسورد ")
                    setTimeout(() => {
                        clearInterval(intervals);
                        ReactDOM.render(<PasswordSet token={token}/>, document.getElementById("login-form"));
                    }, 600)
                }
            }).catch(error => {
            ReactDOM.render('', loadingElement);
            if (error.response.data.errors) {
                ErroHandle(error.response.data.errors)
            } else {
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
    }


    const verifyCodeGet = (e) => {
        e.preventDefault();
        if (verifyCode.verifyCode.length < 4) {
            setVerifyCode({
                [e.target.name]: e.target.value
            })
        }

    }

    const checkButton = () => {
        let numberReg = /^\d+$/;
        if (verifyCode) {
            if (numberReg.test(verifyCode.verifyCode)) {
                if (verifyCode.verifyCode.length == 4) {
                    return (
                        <button className={"btn btn-primary glow w-100 position-relative"} id={"verifyCodessss"} style={{fontSize: '11px'}}
                                onClick={e => checkCode(e)}>بررسی
                            کد</button>
                    )
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
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
                        <h4 className="text-center mb-2">بازگردانی رمز عبور</h4>
                    </div>
                </div>

                <p style={{paddingRight : '25px' , fontSize:13}}>
                    در صورتی که رمز عبور پنل کاربری خود را فراموش کرده اید کافیست با وارد کردن شماره تلفن همراه و تایید آن توسط کد پیامک ارسال شده به تلفن همراه خود وارد پنل تغییر رمز عبور شوید.
                </p>


                <div className="card-content">
                    <div className="card-body">

                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">
                                شماره تلفن خود را وارد کنید
                            </label>
                            <input type="number" className="form-control text-left"
                                   id="username"
                                   autocomplete="one-time-code"
                                   onChange={e => HandlePhone(e)}
                                   name="mobile"
                                   placeholder="شماره تلفن" dir="ltr"/>


                            <button type="submit"
                                    onClick={e => RegisterPhone(e)}
                                    style={{marginTop: 15}}
                                    className="btn btn-primary glow w-100 position-relative">{CounterTimer > 0 ? "دریافت مجدد کد تایید" : "دریافت کد تایید"}</button>
                        </div>
                        <div>
                            <a href={"/login"} style={{borderBottom: '1px dashed', cursor: 'pointer'}}><small>بازگشت به
                                ورود</small></a>
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


                                <div className="alert border-success alert-dismissible mb-2" role="alert" id={"customAlert"}>
                                    <div className="d-flex align-items-center">
                                        <span>
کد تایید به شماره تلفن همراه {phone.mobile ? phone.mobile : ''} ارسال شد.
                </span>
                                    </div>
                                </div>


                                <div className={"col-12"}
                                     style={{display: 'flex', alignItem: 'center', justifyContent: 'center'}}>
                                    <div className={"verify-code-check"}>
                                        <input type={"number"}
                                               className={"form-control " + isInvalid == true ? "is-invalid" : ""}
                                               name={"verifyCode"}
                                               min="1000"
                                               max="9999"
                                               maxLength={15}
                                               autoComplete={"none"}
                                               onChange={e => verifyCodeGet(e)}
                                               placeholder={"کد تایید را وارد کنید"}/>
                                    </div>
                                </div>


                                <button className={"btn btn-primary"} id={"verifyCodessss"} style={{fontSize: '11px'}}
                                        onClick={e => checkCode(e)}>بررسی
                                    کد</button>


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

export default MobileVerify;
