import React, {Component, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {csrf_token, error as ErrorToast, url, success, ErroHandle, info, warning, empty, redirect} from "../../helper";
import {Request} from './../../services/AuthService/Api'
import MobileVerify from "./RePass/MobileVerify";
import $ from 'jquery'
import Loading from "./Loading";

const LoginForm = ({token}) => {


    let elementLoading = document.getElementById("loading-show")

    const [userData, setUserData] = useState({});

    const RePassClick = (e) => {
        e.preventDefault();
        console.log("click")
        // ReactDOM.render(<Loading />, elementLoading);
        $("#loading-show").addClass("activeLoadingLogin");

        setTimeout(() => {
            ReactDOM.render(<MobileVerify token={token}/>, document.getElementById("login-form"))
        }, 400)
    }


    let time_toast = 0;
    const submitForm = (e) => {
        e.preventDefault();
        let mobile = $("input[name=mobile]").val();
        let password = $("input[name=password]").val();

        let patt = /0?9([0-9]{9})/;
        let user = {...userData};
        user._token = token;
        user.mobile = mobile;
        user.password = password;

        if (mobile.length > 0 && password.length > 0) {
            if (patt.test(mobile)) {
                $("#loading-show").addClass("activeLoadingLogin");
                Request.Login(user)
                    .then(response => {
                        $("#loading-show").removeClass("activeLoadingLogin");
                        success("در حال انتقال به داشبورد ...")
                        setTimeout(() => {
                            window.location.pathname = "/dashboard"
                        }, 500)
                    }).catch(error => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                })
            } else {
                ErrorToast("شماره تلفن را به شکل صحیح وارد کنید");
            }
        } else {
            ErrorToast("فیلد ها را پر کنید");
        }


    }

    const changeRemember = (e) => {
        let userDtaaaa = {...userData};
        let checked = e.target.checked;
        if (checked == true) {
            userDtaaaa.remember_me = 1
        } else {
            userDtaaaa.remember_me = 0
        }
        setUserData(userDtaaaa)
    }

    return (
        <div
            style={{position: 'relative'}}
            className="card disable-rounded-right mb-0 p-2 h-100">

            <div className="card-header pb-1">
                <div className="card-title">
                    <h4 className="text-center mb-2">خوش آمدید</h4>
                </div>
            </div>


            <div className="card-content">
                <div className="card-body">

                    <form onSubmit={e => submitForm(e)}>
                        {csrf_token(token)}
                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">شماره تلفن همراه</label>
                            <input
                                autocomplete="off"
                                type="text" className="form-control text-left"
                                id="mobile"
                                name="mobile"
                                placeholder="شماره تلفن همراه" dir="ltr"/>
                        </div>
                        <div className="form-group">
                            <label className="text-bold-700" htmlFor="password">رمز
                                عبور</label>
                            <input type="password" className="form-control text-left"
                                   name="password" id="password"
                                   autocomplete="off"
                                   placeholder="رمز عبور" dir="ltr"/>
                        </div>
                        <div
                            className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                            <div className="text-left">
                                <div className="checkbox checkbox-sm">
                                    <input type="checkbox" onChange={e => changeRemember(e)}
                                           className="form-check-input"
                                           name={"remember_me"}
                                           id="exampleCheck1"/>
                                    <label className="checkboxsmall" htmlFor="exampleCheck1"><small>مرا
                                        به خاطر بسپار</small></label>
                                </div>
                            </div>
                            <div className="text-right line-height-2">
                                <a
                                    style={{cursor: 'pointer'}}
                                    className="card-link">
                                    <small onClick={e => RePassClick(e)}>
                                        رمز عبورتان را فراموش کرده
                                        اید؟
                                    </small>
                                </a>
                            </div>
                        </div>
                        <button type="submit"
                                className="btn btn-primary glow w-100 position-relative">ورود
                        </button>
                    </form>
                    <hr/>
                    <div className="text-center"><small className="mr-25">تا کنون ثبت نام نکرده اید؟</small><a
                        href={url('auth/register')}><small>ثبت نام کنید</small></a>
                    </div>
                </div>

            </div>
            <div id={"loading-show"} style={{zIndex: 9999, visibility: 'hidden'}}>
                <Loading/>
            </div>

        </div>
    );

}

export default LoginForm;

let elementId = 'login-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<LoginForm {...props}/>, element);
}
