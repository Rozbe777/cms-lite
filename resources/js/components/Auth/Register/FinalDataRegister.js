import React from "react";

const FinalDataRegister = () => {
    return (
        <div className="col-md-6 col-12 px-0">
            <div className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                <div className="card-header pb-1">
                    <div className="card-title">
                        <h4 className="text-center mb-2">ثبت نام</h4>
                    </div>
                </div>
                <div className="text-center">
                    <p>
                        <small className="line-height-2 d-inline-block"> لطفا جزئیات خود را برای ثبت نام
                        وارد کرده و عضوی از جامعه عالی ما شوید.</small>
                    </p>
                </div>
                <div className="card-content">
                    <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputfirstname4">نام</label>
                                    <input type="text" className="form-control" id="inputfirstname4"
                                           name="name" value="{{old('name')}}" placeholder="نام" />

                                </div>
                                <div className="form-group col-md-6 mb-50">
                                    <label htmlFor="inputlastname4">نام خانوادگی</label>
                                    <input type="text" className="form-control" id="inputlastname4"
                                           name="last_name" value=""
                                           placeholder="نام خانوادگی" />
                                </div>

                            </div>
                            <div className="form-group mb-50">
                                <label className="text-bold-700" htmlFor="exampleInputUsername1">شماره
                                    موبایل</label>
                                <input type="text" className="form-control text-left"
                                       name="phone" value=""
                                       id="exampleInputUsername1" placeholder="شماره موبایل"
                                       dir="ltr" />

                            </div>
                            <div className="form-group mb-50">
                                <label className="text-bold-700" htmlFor="exampleInputEmail1">آدرس
                                    ایمیل</label>
                                <input type="email" className="form-control text-left"
                                       name="email" value="" id="exampleInputEmail1"
                                       placeholder="آدرس ایمیل" dir="ltr" />

                            </div>
                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">رمز
                                    عبور</label>
                                <input type="password" className="form-control text-left"
                                       name="password" id="password" placeholder="رمز عبور"
                                       dir="ltr" />

                            </div>
                            <div className="form-group mb-2">
                                <label className="text-bold-700" htmlFor="exampleInputPassword1">تایید رمز
                                    عبور </label>
                                <input type="password" className="form-control text-left"
                                       name="password_confirmation" id="password-confirm"
                                       placeholder=" تایید رمز عبور" dir="ltr" />

                            </div>

                            <button type="submit"
                                    className="btn btn-primary glow position-relative w-100">ثبت نام<i
                                id="icon-arrow" className="bx bx-left-arrow-alt"></i></button>
                        <hr />
                            <div className="text-center">
                                <small className="mr-25">حساب کاربری دارید؟</small>
                                <a><small>ورود</small></a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

    export default FinalDataRegister;
