import React, {useState, useEffect} from "react";
import {error as ErrorToast , success as SuccessToast} from './../../../helper';
import {Request} from './../../../services/AuthService/Api'
import './_shared/style.scss';

const FinalDataRegister = ({token, id}) => {
    const [userData, setUserData] = useState({});
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
        // console.log(pass.toString() , "/" , passConfirm.toString() )
        if(pass !== passCon){
            ErrorToast("پسورد ها با هم یکسان نیستند!")
        } else{
            let time_toast = 300;
            Request.StoreUserInfo(userDataNew)
                .then(response => {
                    SuccessToast("اطلاعات شما با موفقیت ثبت شد! کمی صبر کنید...")
                    setTimeout(()=>{

                    },600)
                }).catch(error => {
                    Object.keys(error.response.data.errors).map((name , i) => {
                        setTimeout(()=>{
                            ErrorToast(error.response.data.errors[name][0])
                        },time_toast)
                        time_toast = time_toast+500;

                    })
            })
        }

    }
    return (
        <div className="col-12 px-0">
            <div className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center"
                 id={"card-contents"}>
                <div className="card-content">
                    <form onSubmit={e => verifyForm(e)} autocomplete="off">

                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputfirstname4">نام</label>
                                    <input type="text" autoComplete="off" className="form-control inputRegister"
                                           id="inputfirstname4"
                                           autocomplete="one-time-code"
                                           name="name" onChange={e => onChangeInput(e)} placeholder="نام"/>
                                </div>
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputlastname4">نام خانوادگی</label>
                                    <input type="text" autoComplete="off" className="form-control inputRegister"
                                           id="inputlastname4"
                                           autocomplete="one-time-code"
                                           name="last_name" onChange={e => onChangeInput(e)}
                                           placeholder="نام خانوادگی"/>
                                </div>
                            </div>

                            <div className="form-group mb-50">
                                <label className="text-bold-700" htmlFor="exampleInputEmail1">آدرس
                                    ایمیل</label>
                                <input type="email" autoComplete="off" className="form-control inputRegister text-left"
                                       autocomplete="one-time-code"
                                       name="email" onChange={e => onChangeInput(e)} id="exampleInputEmail1"
                                       placeholder="آدرس ایمیل" dir="ltr"/>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">رمز
                                    عبور</label>
                                <input type="password" autoComplete="off"
                                       className="form-control inputRegister text-left"
                                       name="password"
                                       autocomplete="one-time-code"
                                       onChange={e => onChangeInput(e)}
                                       id="password" placeholder="رمز عبور"
                                       dir="ltr"/>
                            </div>
                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">تایید رمز
                                    عبور </label>
                                <input type="password" autoComplete="off"
                                       className="form-control inputRegister text-left"
                                       autocomplete="one-time-code"
                                       onChange={e => onChangeInput(e)}
                                       name="password_confirmation" id="password-confirm"
                                       placeholder=" تایید رمز عبور" dir="ltr"/>
                            </div>

                            <button type={"submit"}
                                    className="btn btn-primary glow position-relative w-100">ثبت اطلاعات تکمیلی<i
                                id="icon-arrow" className="bx bx-left-arrow-alt"></i></button>
                            <hr/>
                            <div className="text-center">
                                <small className="mr-25">حساب کاربری دارید؟</small>
                                <a href={"/login"}><small>ورود</small></a>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default FinalDataRegister;
