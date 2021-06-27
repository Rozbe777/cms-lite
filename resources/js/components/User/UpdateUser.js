import React, {useState, useEffect} from "react";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import Loading from "../Auth/Loading";
import ReactDOM from "react-dom";
import $ from "jquery";
import {BreadCrumbs} from "../Admin/UserList/HOC/BreadCrumbs";

const UpdateUser = (props) => {

    // let {name, last_name, email, phone, role_id, password, roles} = state;

    let defaultImg = 'images/avatar.jpg'
    const {token, roles, is_admin, user} = props;
    console.log("cccc", JSON.parse(user))

    const [imageGet, setImage] = useState({state: ''})

    const [loading, setLoading] = useState(false)


    const handleGetImg = name => {
        let names = name.split("/")
        setLoading(true)
        Request.GetImage(names[2])
            .then(rr => {
                setLoading(false)
                setImage({state: rr.data})
            }).catch(err => {
            ErrorToast("خطایی در دانلود تصویر رخ داده است")
        })
    }

    useEffect(() => {
        if (JSON.parse(user).image) {
            let img = JSON.parse(user).image;

            handleGetImg(img)

        } else {
            setImage({state: ''})
        }
    }, [])

    let userData = JSON.parse(user);
    const [preImage, setPreImage] = useState({uri: defaultImg})
    const [pre, setPre] = useState(false)
    const [file, setFile] = useState({file: ''})
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

    useEffect(() => {
        ReactDOM.render(<BreadCrumbs fixed={true} data={breadData}/>, document.getElementById("bradcrummmm"))
    }, [])
    const submitForm = () => {


        let forms = new FormData();
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

        if (file.file) {
            forms.append("image", file.file);
        } else {
            if (imageGet.state == '') {
                forms.append("image", '');
            } else {
                forms.append("image", true);
            }
        }

        forms.append("_token", token);

        forms.append("name", state.name);
        forms.append("id", id);
        forms.append("last_name", state.last_name);
        forms.append("email", state.email ? state.email : '');
        // forms.append("password", state.password);
        forms.append("role_id", state.role_id);
        forms.append("status", state.status);
        // delete 0 from first mobile number
        let mobiles = Array.from(mobile);
        let FirstNumber = mobiles[0]
        if (FirstNumber === 0 || FirstNumber === "0") {
            mobiles.shift();
            let newMobile = mobiles.join('');
            forms.append("mobile", newMobile);

            $("#loading-show").addClass("activeLoadingLogin");
            Request.UpdateUserDetail(forms, id)
                .then(res => {
                    console.log("vvvvvvvvvvvvvvv" , res)
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("اطلاعات ویرایش شد");
                    setTimeout(() => {
                        // window.location.reload();
                    }, 400)
                }).catch(error => {
                    console.log("-------" , error)
                $("#loading-show").removeClass("activeLoadingLogin");
                if (error.response.data.errors) {
                    ErroHandle(error.response.data.errors)
                } else {
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }
            })
        } else {
            forms.append("mobile", state.mobile);

            $("#loading-show").addClass("activeLoadingLogin");
            Request.UpdateUserDetail(forms, id)
                .then(res => {
                    console.log("vvvvvvvvvvvvvvv" , res)

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

    const handlePreShowImage = e => {
        e.preventDefault();
        let preImages = {...preImage}
        if (event.target.files && event.target.files[0]) {
            preImages.uri = URL.createObjectURL(event.target.files[0])
            setPreImage(preImages)
        }
    }

    const handleFile = e => {
        e.preventDefault();
        handlePreShowImage(e);
        let filed = {...file};
        filed.file = e.target.files[0];
        setFile(filed);
        setPre(true)


    }


    const handledelImg = (e) => {
        e.preventDefault();

        let preImages = {...preImage}
        preImages.uri = defaultImg;
        setPreImage(preImages)
        setPre(false)
        let states = {...imageGet};
        states.state = '';
        setImage(states)
    }


    return (
        <div>


            <div className="media mb-2" style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center'
            }}>
                {
                    loading ? (
                        <>
                            <img src={url(preImage.uri)} alt={''}
                                 className="users-avatar-shadow rounded-circle" height="120"
                                 width="120"/>
                            <div className={"loadingsss"}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">در حال بارگذاری ...</span>
                                </div>
                            </div>
                        </>

                    ) : pre ? (<img src={preImage.uri} alt={''}
                                    className="users-avatar-shadow rounded-circle" height="120"
                                    width="120"/>) : imageGet.state ?
                        (
                            <img src={imageGet.state} alt={''}
                                 className="users-avatar-shadow rounded-circle" height="120" width="120"/>
                        ) : (
                            <img src={url(preImage.uri)} alt={''}
                                 className="users-avatar-shadow rounded-circle" height="120" width="120"/>
                        )
                }


                <span id={"choise-img"}>
                    <i className={"bx bx-camera"}></i>

                    <input type={"file"} onChange={e => handleFile(e)}
                           style={{opacity: 0, position: 'absolute', right: 0, cursor: 'pointer'}}
                    />
                </span>

                <span id={"choise-img"} onClick={e => handledelImg(e)} style={{right: 0, left: '-75px'}}>
                    <i className={"bx bx-trash-alt"}></i>

                </span>

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
                                        <select defaultValue={"0"} name={"role_id"} className="form-control text-left"
                                                placeholder="دسترسی"
                                                style={{height: 50}}
                                                onChange={(e) => {
                                                    HandleInput(e)
                                                }}>
                                            {JSON.parse(roles).map((role, index) => (
                                                    state.role_id === role.id ? (
                                                        <option key={index} value={role.id}>{role.display_name}</option>
                                                    ) : (
                                                        <option key={index} value={role.id}>{role.display_name}</option>
                                                    )
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group col-md-6">
                                    <div className="controls">
                                        <label>وضعیت</label>
                                        <select defaultValue={"active"} name={"status"}
                                                className="form-control text-left" placeholder="وضعیت"
                                                style={{height: 50}}
                                                onChange={(e) => {
                                                    HandleInput(e)
                                                }}>
                                            {state.status === "active" ? (
                                                <>
                                                    <option value={"active"}>فعال</option>
                                                    <option value={"deactivate"}>غیرفعال</option>
                                                </>

                                            ) : (
                                                <>
                                                    <option value={"active"}>فعال</option>
                                                    <option selected value={"deactivate"}>غیرفعال</option>
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

