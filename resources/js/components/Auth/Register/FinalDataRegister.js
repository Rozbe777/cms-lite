import React, {useState, useEffect} from "react";
import {error as ErrorToast, ErroHandle, success as SuccessToast} from './../../../helper';
import {Request} from './../../../services/AuthService/Api'
import './_shared/style.scss';
import Loading from "../Loading";
import $ from "jquery";

const FinalDataRegister = ({token, id}) => {
    const [userData, setUserData] = useState({
        name: '',
        last_name: ''
    });
    useEffect(() => {

    }, [])
    const onChangeInput = e => {
        e.preventDefault();
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const verifyForm = (e) => {
        e.preventDefault();
        let userDataNew = {...userData};
        userDataNew._token = token;
        userDataNew.id = id;

        let pass = $("input[name=password]").val();
        let passCon = $("input[name=password_confirmation]").val();
        // let passConfirm = userDataNew.password_confirmation;


        if (userData.name === "" || userData.last_name === "" || pass === "" || passCon === "") {
            if (userData.name === "") {
                ErrorToast("فیلد نام خالی میباشد")
            }

            if (userData.last_name === "") {
                ErrorToast("فیلد نام خانوداگی خالی میباشد")
            }

            if (pass === "") {
                ErrorToast("فیلد پسورد خالی میباشد")
            }

            if (passCon === "") {
                ErrorToast("فیلد تکرار پسورد خالی میباشد")
            }


        } else {
            if (pass !== passCon) {
                ErrorToast("پسورد ها با هم یکسان نیستند")
            } else {
                let time_toast = 300;

                $("#loading-show").addClass("activeLoadingLogin");
                Request.StoreUserInfo(userDataNew)
                    .then(response => {
                        $("#loading-show").removeClass("activeLoadingLogin");
                        SuccessToast("اطلاعات شما با موفقیت ثبت شد. کمی صبر کنید...")
                        setTimeout(() => {
                            window.location.pathname = "/dashboard"
                        }, 600)
                    }).catch(error => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                })
            }
        }


    }
    return (
        <div className="col-12 px-0">
            <div className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center"
                 id={"card-contents"}>
                <div className="alert border-success alert-dismissible mb-2" role="alert" >
                    <div className="d-flex align-items-center">
                                        <span>
شماره تلفن همراه شما با موفقیت تایید شد لطفا برای تکمیل حساب کاربری خود فرم زیر را پر کنید.

                </span>
                    </div>
                </div>
                <div className="card-content">
                    <form onSubmit={e => verifyForm(e)} autoComplete="off">

                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputfirstname4">نام</label>
                                    <input type="text" autoComplete="off" className="form-control inputRegister"
                                           id="inputfirstname4"
                                           autoComplete="one-time-code"
                                           name="name" onChange={e => onChangeInput(e)} placeholder="نام"/>
                                </div>
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputlastname4">نام خانوادگی</label>
                                    <input type="text" autoComplete="off" className="form-control inputRegister"
                                           id="inputlastname4"
                                           autoComplete="one-time-code"
                                           name="last_name" onChange={e => onChangeInput(e)}
                                           placeholder="نام خانوادگی"/>
                                </div>
                            </div>


                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">رمز
                                    عبور</label>
                                <input type="password" autoComplete="off"
                                       className="form-control inputRegister text-left"
                                       name="password"
                                       autoComplete="one-time-code"
                                       onChange={e => onChangeInput(e)}
                                       id="password" placeholder="رمز عبور"
                                       dir="ltr"/>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">تایید رمز
                                    عبور </label>
                                <input type="password" autoComplete="off"
                                       className="form-control inputRegister text-left"
                                       autoComplete="one-time-code"
                                       onChange={e => onChangeInput(e)}
                                       name="password_confirmation" id="password-confirm"
                                       placeholder=" تایید رمز عبور" dir="ltr"/>
                            </div>

                            <button type={"submit"}
                                    className="btn btn-primary glow position-relative w-100">ثبت اطلاعات تکمیلی<i
                                id="icon-arrow" className="bx bx-left-arrow-alt"></i></button>
                            {/*<hr/>*/}
                            {/*<div className="text-center">*/}
                            {/*    <small className="mr-25">حساب کاربری دارید؟</small>*/}
                            {/*    <a href={"/login"}><small>ورود</small></a>*/}
                            {/*</div>*/}
                        </div>
                    </form>


                </div>
            </div>
            <div id={"loading-show"} style={{zIndex: 9999, visibility: 'hidden'}}>
                <Loading/>
            </div>
        </div>
    )
}

export default FinalDataRegister;
