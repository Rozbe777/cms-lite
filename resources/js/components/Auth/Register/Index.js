import React, {useState} from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";
import './_shared/style.scss';
import {Request} from "../../../services/AuthService/Api";
import VerifyPhone from "./VerifyPhone";
import Loading from "../Loading";

const Index = (props) => {

    let CounterTimer = 0;
    const {token} = props;
    const [phone, setPhone] = useState();
    const [response, setResponse] = useState();
    // const [timer , setTimer] = useState(0);
    let elementVerify = document.getElementById("back-loaders-verify")
    let elementLoading = document.getElementById("loading-show")
    const VerifyModal = (e) => {
        e.preventDefault();
        ReactDOM.render(<VerifyPhone time={CounterTimer}/>, elementVerify)
    }

    const HandlePhone = (e) => {
        e.preventDefault();

        setPhone({
            mobile: e.target.value
        })
    }

    const RegisterPhone = (e) => {
        e.preventDefault();
        let phones = {...phone};
        phones._token = token;
        ReactDOM.render(<Loading/>, elementLoading);

        Request.RegisterPhone(phones)
            .then(response => {
                CounterTimer = 120;
                ReactDOM.render('', elementLoading);
                VerifyModal(e, response)
            }).catch((error) => {
            // Error
            if (error.response) {
                ReactDOM.render('', elementLoading);
                CounterTimer = error.response.data.data;
                VerifyModal(e, error.response.data.data);
            } else if (error.request) {

                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });

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
                            <a style={{borderBottom: '1px dashed', cursor: 'pointer'}}><small>ورود به پنل</small></a>
                        </div>
                    </div>
                </div>


                <div id={"loading-show"}>

                </div>

            </div>


            <div id={"back-loaders-verify"}>



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
