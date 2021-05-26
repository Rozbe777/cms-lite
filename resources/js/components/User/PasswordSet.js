import React, {useState} from "react";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import Loading from "../Auth/Loading";
import ReactDOM from "react-dom";
import $ from "jquery";

const PasswordSet = ({token}) => {


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
                        success("پسورد با موفقیت تعویض شد");
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

    return (
        <div
            style={{position: 'relative' , padding : '0px !important'}}
            className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">

                    <form onSubmit={e => submitForm(e)} autocomplete="off">


                        <div className={"col-12"} style={{padding : '0px'}}>
                            <div className="col-lg-6 col-sm-12 form-group mb-50" style={{padding: 0}}>
                                <label className="text-bold-700" htmlFor="username">پسورد جدید</label>
                                <input
                                    autoComplete="one-time-code"
                                    onChange={e => changeInput(e)}
                                    type="password" className="form-control text-left"
                                    id="username"
                                    name="password"
                                    placeholder="پسورد جدید" dir="ltr"/>
                            </div>
                        </div>

                        <div className={"col-12"} style={{padding : '0px'}}>
                            <div className="col-lg-6 col-sm-12 form-group mb-50" style={{padding: 0}}>
                                <label className="text-bold-700" htmlFor="password">تکرار پسورد جدید</label>
                                <input type="password" className="form-control text-left"
                                       name="password_confirmation" id="password"
                                       onChange={e => changeInput(e)}
                                       autoComplete="one-time-code"
                                       placeholder="تکرار پسورد جدید" dir="ltr"/>
                            </div>

                        </div>

                        <div className="col-lg-6 col-sm-12 d-flex flex-sm-row flex-column justify-content-end mt-1" style={{padding :0}}>
                            <button type="submit"
                                    className="btn  btn-primary glow mb-1 mb-sm-0 ">تنظیم پسورد</button>
                        </div>
                    </form>



            <div id={"loading-show"}>

            </div>
        </div>
    );

}

export default PasswordSet;

let elementId = 'update-user-password-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<PasswordSet {...props}/>, element);
}
