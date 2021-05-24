import React, {Component, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {csrf_token, error as ErrorToast,ErroHandle , url, success, info, warning, empty, redirect} from "../../../helper";
import {Request} from './../../../services/AuthService/Api'
import './../Register/_shared/style.scss'
import Loading from "./../Loading";
import $ from "jquery";
import MobileVerify from "./MobileVerify";

const PasswordSet = ({token}) => {


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
        let pass = $("input[name=password]").val();
        let passCon = $("input[name=password_confirmation]").val();


        if (pass.length > 3) {
            if (pass == passCon) {
                ReactDOM.render(<Loading/>, elementLoading);
                Request.RecoveryPass(user)
                    .then(response => {
                        ReactDOM.render('', elementLoading);
                        success("پسورد با موفقیت تعویض شد! کمی صبر کنید ...");
                        setTimeout(() => {
                            window.location.pathname = "/dashboard"
                        }, 400)
                    }).catch(error => {
                    ReactDOM.render('', elementLoading);
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }

                })
            } else {
                ErrorToast("پسورد ها با هم تطابق ندارند");
            }

        } else {
            ErrorToast("پسورد باید بیشتر از 4 رقم باشد");
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


                    <div style={{marginTop: 15}}>
                        <a href={"/login"} style={{borderBottom: '1px dashed', cursor: 'pointer'}}><small>بازگشت به
                            ورود</small></a>
                    </div>


                </div>
            </div>

            <div id={"loading-show"}>

            </div>
        </div>
    );

}

export default PasswordSet;

