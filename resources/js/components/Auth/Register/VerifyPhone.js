import React, {useEffect, useState} from "react";
import $ from 'jquery';
import {VERIFY_MOBILE_URL} from "../../../services/Type";
import {Request} from "../../../services/AuthService/Api";
import ReactDOM from 'react-dom'
import Loading from "../Loading";
import {error as ErrorToast , success} from './../../../helper'
import FinalDataRegister from "./FinalDataRegister";

const VerifyPhone = ({time, token, phoneNumber , response : pushResponse}) => {

    let timers = 0;
    const [verifyCode, setVerifyCode] = useState({
        code_1: '',
        code_2: '',
        code_3: '',
        code_4: '',
    });

    useEffect(() => {
        $("input[name=code_1]").focus();
        Timer();

    }, [])

    const Timer = () => {
        timers = time;
        var min = Math.floor(timers / 60);
        var sec = Math.floor(timers - (min * 60));
        setInterval(function () {
            if (min == 0 && sec == 0) {
                // time expired
                $("#timersPop").html("");
                $("#timersPop").html("مجددا جهت دریافت کد اقدام فرمایید");
            } else {
                if (sec == 0) {
                    min--;
                    sec = 60;
                }
                sec--;
                $("#timersPop").html("");
                $("#timersPop").html("0" + min + ":" + sec + " تا انقضای کد ارسالی");
            }
        }, 1000)
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


    let elementVerify = document.getElementById("back-loaders-verify")
    let formInformation = document.getElementById("register-form")
    const checkCode = (e) => {
        e.preventDefault();
        let code = parseInt(verifyCode.code_1 + verifyCode.code_2 + verifyCode.code_3 + verifyCode.code_4);
        let data = {
            token: code,
            _token: token
        }

        console.log("/////" , data);

        ReactDOM.render(<Loading/>, loadingElement);
        Request.VerifyCodeCheck(data)
            .then(response => {
                ReactDOM.render('', loadingElement);

                if (response.data.data.http_code == 200){
                    success("تایید شماره تلفن موفقیت آمیز بود! کمی صبر کنید...")
                    setTimeout(()=>{
                        pushResponse(200)
                    },600)
                }
            } ).catch(error => {
                if (error.response.data.http_code == 404) {
                ReactDOM.render('', loadingElement);
                ErrorToast("کد را به صورت صحیح وارد کنید!")
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
        setVerifyCode({
            ...verifyCode,
            [e.target.name]: e.target.value
        })
    }

    const checkButton = () => {
        if (verifyCode.code_1 !== '' && verifyCode.code_2 !== '' && verifyCode.code_3 !== '' && verifyCode.code_4 !== '') {
            if (checkVerifyNumber(verifyCode.code_1) && checkVerifyNumber(verifyCode.code_2) && checkVerifyNumber(verifyCode.code_3) && checkVerifyNumber(verifyCode.code_4)) {
                return (
                    <button className={"btn btn-primary"} style={{fontSize: '11px'}} onClick={e => checkCode(e)}>بررسی
                        کد</button>
                )
            }

        } else {
            return ''
        }
    }

    const closeModal = e => {
        e.preventDefault();
        ReactDOM.render('',elementVerify);
    }

    return (
        <div className={"container-loader"}>
            <div className={"container"} style={{height: '100%'}}>
                <div className="row justify-content-center align-items-center" style={{height: '100%'}}>
                    <div className="col-md-4 col-sm-10">
                        <div className={"verifyForm"}>

                            <span id={"close-icon"} onClick={e => closeModal(e)}>
                                <i className={"bx bx-x"}></i>
                            </span>

                            <p>کد تایید را وارد کنید</p>

                            <div id="wrapper">
                                <input
                                    type="text"
                                    placeholder="--"
                                    maxLength="1"
                                    size="1"
                                    step={"1"}
                                    name="code_1"
                                    onChange={(e) => verifyCodeGet(e)}
                                    min="0"
                                    max="9"
                                    pattern="\d*"
                                />
                                <input
                                    type="text"
                                    placeholder="--"
                                    maxLength="1"
                                    size="1"
                                    onChange={(e) => verifyCodeGet(e)}
                                    name="code_2"
                                    min="0"
                                    max="9"
                                    pattern="[0-9]{1}"
                                />
                                <input
                                    type="text"
                                    placeholder="--"
                                    maxLength="1"
                                    size="1"
                                    onChange={(e) => verifyCodeGet(e)}
                                    name="code_3"
                                    min="0"
                                    max="9"
                                    pattern="[0-9]{1}"
                                />
                                <input
                                    type="text"
                                    placeholder="--"
                                    maxLength="1"
                                    size="1"
                                    name="code_4"
                                    min="0"
                                    max="9"
                                    onChange={(e) => verifyCodeGet(e)}
                                    pattern="[0-9]{1}"
                                />
                            </div>

                            {checkButton()}
                            <div id={"timersPop"}></div>

                            {/*<div id='retryCode'></div>*/}

                            <div id={"loading-shows"}>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyPhone;
