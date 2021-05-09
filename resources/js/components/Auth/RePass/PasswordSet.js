import React, {Component, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {csrf_token, error as ErrorToast, url, success, info, warning, empty, redirect} from "../../../helper";
import {Request} from './../../../services/AuthService/Api'
import './../Register/_shared/style.scss'
import Loading from "./../Loading";
import $ from "jquery";
import MobileVerify from "./MobileVerify";

const PasswordSet = ({token}) => {

    const [verifyCode, setVerifyCode] = useState(
        {
            code_1: '',
            code_2: '',
            code_3: '',
            code_4: ''
        }
    )
    useEffect(() => {

    })

    let elementLoading = document.getElementById("loading-show")

    const [userData, setUserData] = useState({});
    const changeInput = e => {
        e.preventDefault();
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }


    let time_toast = 0;
    const submitForm = e => {
        e.preventDefault();

        let user = {...userData};
        user._token = token;
        let verifyForm = parseInt(verifyCode.code_1 + verifyCode.code_2 + verifyCode.code_3 + verifyCode.code_4);
        let pass = $("input[name=password]").val();
        let passCon = $("input[name=password_confirmation]").val();
        user.token = verifyForm;

        console.log("code verify : ", user)
        if (verifyForm.length < 4) {
            ErrorToast("کد تایید را کامل وارد کنید!");
        } else {
            if (pass.length > 3) {
                if (pass == passCon) {
                    ReactDOM.render(<Loading/>, elementLoading);
                    Request.RecoveryPass(user)
                        .then(response => {
                            ReactDOM.render('', elementLoading);
                            success("پسورد با موفقیت تعویض شد! کمی صبر کنید ...");
                            setTimeout(() => {
                                window.location.pathname = "/login"
                            }, 400)
                        }).catch(error => {

                            if (error.response.data.http_code == 404){
                                ReactDOM.render('', elementLoading);
                                ErrorToast("خطای ناخواسته ای رخ داده است! مجدد تلاش کنید!")
                            }else{
                                ReactDOM.render('', elementLoading);
                                Object.keys(error.response.data.errors).map((name, i) => {
                                    setTimeout(() => {
                                        ErrorToast(error.response.data.errors[name][0])
                                    }, time_toast)
                                    time_toast = time_toast + 500;

                                })
                            }
                            console.log("dataaaaaa : " , error.response.data)

                    })
                } else {
                    ErrorToast("پسورد ها با هم تطابق ندارند!");
                }

            } else {
                ErrorToast("پسورد باید بیشتر از 4 رقم باشد!");
            }
        }


    }

    const MobileVeri = e => {
        e.preventDefault();
        ReactDOM.render(<Loading/>, elementLoading);
        setTimeout(() => {
            ReactDOM.render(<MobileVerify token={token}/>, document.getElementById("login-form"))
        }, 400)
    }

    const verifyCodeGet = (e) => {
        e.preventDefault();
        setVerifyCode({
            ...verifyCode,
            [e.target.name]: e.target.value
        })
    }


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

    return (
        <div
            style={{position: 'relative'}}
            className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">

            <div className="card-header pb-1">
                <div className="card-title">
                    <h4 className="text-center mb-2">تنظیم پسورد جدید</h4>
                </div>
            </div>


            <div className="card-content">
                <div className="card-body">
                    <form onSubmit={e => submitForm(e)} autocomplete="off">
                        {csrf_token(token)}
                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">کد تایید</label>


                            <div id="wrapper" style={{border: '1px solid #dfe3e7', borderRadius: '5px'}}>
                                <input
                                    style={{height: '30px !important'}}
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

                        </div>

                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">پسورد جدید</label>
                            <input
                                autocomplete="one-time-code"
                                onChange={e => changeInput(e)}
                                type="password" className="form-control text-left"
                                id="username"
                                name="password"
                                placeholder="پسورد جدید" dir="ltr"/>
                        </div>
                        <div className="form-group">
                            <label className="text-bold-700" htmlFor="password">تکرار پسورد جدید</label>
                            <input type="password" className="form-control text-left"
                                   name="password_confirmation" id="password"
                                   onChange={e => changeInput(e)}
                                   autocomplete="one-time-code"
                                   placeholder="تکرار پسورد جدید" dir="ltr"/>
                        </div>

                        <button type="submit"
                                className="btn btn-primary glow w-100 position-relative">تنظیم پسورد
                        </button>
                    </form>


                <div style={{marginTop : 15}}>
                    <a onClick={e => MobileVeri(e)} style={{borderBottom: '1px dashed', cursor: 'pointer'}}><small>دریافت
                        مجدد کد</small></a>
                </div>

            </div>
        </div>

    <div id={"loading-show"}>

    </div>
</div>
);

}

export default PasswordSet;

