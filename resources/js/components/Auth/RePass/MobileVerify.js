import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import './../Register/_shared/style.scss';
import {Request} from "../../../services/AuthService/Api";
import {error as ErrorToast, success as SuccessToast} from './../../../helper';
import Loading from "../Loading";
import PasswordSet from "./PasswordSet";

const MobileVerify = (props) => {
    useEffect(() => {
    }, [])


    var pattern = /^09([0-9]{2})-?[0-9]{3}-?[0-9]{4}$/;
    const {token} = props;
    const [phone, setPhone] = useState();
    let elementLoading = document.getElementById("loading-show")


    const HandlePhone = (e) => {
        e.preventDefault();
        setPhone({
            mobile: e.target.value
        })
    }

    let time_toast = 0;
    const RegisterPhone = (e) => {

        e.preventDefault()
        let phones = {...phone};
        if (pattern.test(phones.mobile)) {
            phones._token = token;
            console.log("responseeeeee : ", phones)
            ReactDOM.render(<Loading/>, elementLoading);
            Request.PasswordToken(phones)
                .then(response => {
                    ReactDOM.render('', elementLoading);
                    SuccessToast("کد برای شما ارسال شد!")
                    setTimeout(() => {
                        ReactDOM.render(<PasswordSet token={token}/>, document.getElementById("login-form"));
                    }, 400)
                }).catch((error) => {
                // Error
                ReactDOM.render('', elementLoading);
                ErrorToast("شماره تلفن ثبت نام نشده است!")
            });
        } else {
            ErrorToast("فرمت شماره تلفن صحیح نمیباشد!");
        }
    }


    // const GoToLogin = e => {
    //     e.preventDefault();
    //     alert("vsdv")
    //     ReactDOM.render(<Loading/>, elementLoading);
    //     setTimeout(()=>{
    //         ReactDOM.render(<Login data-token={token} /> , document.getElementById("login-form"))
    //     } , 400)
    // }

    return (
        <>
            <div style={{position: 'relative'}}
                 className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">


                <div className="card-header pb-1">
                    <div className="card-title">
                        <h4 className="text-center mb-2">بازگردانی رمز عبور</h4>
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
                                   onChange={e => HandlePhone(e)}
                                   name="mobile"
                                   placeholder="شماره تلفن" dir="ltr"/>


                            <button type="submit"
                                    onClick={e => RegisterPhone(e)}
                                    style={{marginTop: 15}}
                                    className="btn btn-primary glow w-50 position-relative"> دریافت کد تایید
                            </button>
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


        </>

    )
}

export default MobileVerify;


