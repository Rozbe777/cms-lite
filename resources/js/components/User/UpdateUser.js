import React, {useState , useEffect} from "react";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import Loading from "../Auth/Loading";
import ReactDOM from "react-dom";
import $ from "jquery";
import {BreadCrumbs} from "../Admin/UserList/HOC/BreadCrumbs";

const UpdateUser = (props) => {

    // let {name, last_name, email, phone, role_id, password, roles} = state;

    const {token, roles, is_admin, user} = props;
    let userData = JSON.parse(user);
    const [state, setState] = useState({
        id: userData.id,
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        mobile: userData.mobile,
        // password: userData.password,
        role_id: userData.userRole === "user" ? 2 : 1,
        status: userData.status
    })

    const imagePicker = () => {
        warning('در نسخه فعلی انتخاب تصویر آواتار امکان پذیر نیست')
    }

    const HandleInput = e => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const breadData = {
        title: 'ویرایش اطلاعات',
        desc: 'ویرایش اطلاعات و پسورد کاربر'
    };

    useEffect(()=>{
        ReactDOM.render(<BreadCrumbs fixed={true} data={breadData} /> , document.getElementById("bradcrummmm"))
    },[])
    const submitForm = () => {


        var pattern = /^0?9{1}([0-9]{9})$/;
        let {id, name, last_name, email, mobile, password, role_id} = state;
        if (empty(name)) {
            return error('وارد کردن نام الزامی است.')
        }
        if (empty(last_name)) {
            return error('وارد کردن نام‌خانوادگی الزامی است.')
        }

        if (empty(mobile)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }

        if (!pattern.test((mobile))) {
            return error('فرمت شماره تلفن اشتباه است.')
        }
        state._token = token;

        // delete 0 from first mobile number
        let mobiles = Array.from(mobile);
        let FirstNumber = mobiles[0]
        if (FirstNumber === 0 || FirstNumber === "0") {
            mobiles.shift();
            let newMobile = mobiles.join('');
            state.mobile = newMobile;
            $("#loading-show").addClass("activeLoadingLogin");
            Request.UpdateUserDetail(state, id)
                .then(res => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("اطلاعات ویرایش شد");
                    setTimeout(() => {
                        // window.location.reload();
                    }, 400)
                }).catch(error => {
                $("#loading-show").removeClass("activeLoadingLogin");
                if (error.response.data.errors) {
                    ErroHandle(error.response.data.errors)
                } else {
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }
            })
        } else {
            $("#loading-show").addClass("activeLoadingLogin");
            Request.UpdateUserDetail(state, id)
                .then(res => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("اطلاعات ویرایش شد");
                    setTimeout(() => {
                        // window.location.reload();
                    }, 400)
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

    return (
        <div>
            <div className="media mb-2" style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                <a className="mr-2">
                    <img src={url('images/avatar.jpg')} alt={''}
                         className="users-avatar-shadow rounded-circle" height="64" width="64"/>
                </a>
                <div className="media-body">
                    <div className={'row justify-content-between align-items-center pr-2 pl-1'}>

                    </div>
                    <div className="col-12 px-0 d-flex">
                        <a onClick={() => {
                            imagePicker();
                        }} className="btn btn-sm btn-primary mr-25 text-white cursor-pointer">انتخاب تصویر
                            آواتار</a>
                        {/*<a href="#" className="btn btn-sm btn-light-secondary">بازنشانی</a>*/}
                    </div>
                </div>
            </div>

            <form onSubmit={e => {
                e.preventDefault();
                submitForm()
            }}>
                <div className="col-md-12">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>نام</label>
                                <input name={"name"} type="text" className="form-control text-left" placeholder="نام"
                                       autoComplete={"off"}
                                       onChange={(e) => {
                                           HandleInput(e)
                                       }} required
                                       value={state.name ? state.name : ''}
                                       data-validation-required-message="وارد کردن نام الزامی است"
                                       dir="ltr"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>نام خانوادگی</label>
                                <input type="text" className="form-control" placeholder="نام خانوادگی"
                                       autoComplete={"off"}
                                       name={"last_name"}
                                       value={state.last_name ? state.last_name : ''}
                                       onChange={(e) => {
                                           HandleInput(e)
                                       }}
                                       required
                                       data-validation-required-message="وارد کردن نام خانوادگی الزامی است"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>ایمیل</label>
                                <input type="email" className="form-control text-left" placeholder="ایمیل"
                                       autoComplete={"off"}
                                       name={"email"}
                                       defaultValue={state.email ? state.email : ''}
                                       value={state.email ? state.email : ''}
                                       onChange={(e) => {
                                           HandleInput(e)
                                       }}
                                       dir="ltr"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>شماره تلفن‌همراه</label>
                                <input type="number" className="form-control text-left" placeholder="شماره تلفن‌همراه"
                                       autoComplete={"off"}
                                       name={"mobile"}
                                       value={state.mobile ? state.mobile : ''}
                                       onChange={(e) => {
                                           HandleInput(e)
                                       }} required
                                       dir="ltr"/>
                            </div>
                        </div>

                        {is_admin ? (
                            <>
                                <div className="form-group col-md-6">
                                    <div className="controls">
                                        <label>دسترسی</label>
                                        <select name={"role_id"} className="form-control text-left" placeholder="دسترسی"
                                                style={{height: 50}}
                                                onChange={(e) => {
                                                    HandleInput(e)
                                                }}>
                                            {JSON.parse(roles).map((role) => (
                                                    state.role_id === role.id ? (
                                                        <option value={role.id} selected>{role.display_name}</option>
                                                    ) : (
                                                        <option value={role.id} >{role.display_name}</option>
                                                    )
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="controls">
                                        <label>وضعیت</label>
                                        <select name={"status"} className="form-control text-left" placeholder="وضعیت"
                                                style={{height: 50}}
                                                onChange={(e) => {
                                                    HandleInput(e)
                                                }}>
                                            {state.status === "active" ? (
                                                <>
                                                    <option selected value={"active"}>فعال</option>
                                                    <option  value={"deactivate"}>غیرفعال</option>
                                                </>

                                            ) : (
                                                <>
                                                    <option  value={"active"}>فعال</option>
                                                    <option selected  value={"deactivate"}>غیرفعال</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </>

                        ) : ''}

                    </div>

                    <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1"
                         style={{padding: 0}}>
                        <button type="submit"
                                className="btn  btn-primary glow mb-1 mb-sm-0 ">بروزرسانی
                        </button>
                    </div>
                </div>
            </form>


            <div id={"loading-show"} style={{zIndex: 9999, visibility: 'hidden'}}>
                <Loading/>
            </div>
        </div>
    );

}
export default UpdateUser;

let elementId = 'update-user-form-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<UpdateUser {...props}/>, element);
}

