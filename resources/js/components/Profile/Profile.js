import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import $ from "jquery";
import Loading from "../Auth/Loading";

const Profile = (props) => {

    //
    let {user , token} = props;

    console.log("////))))))___" , JSON.parse(props.user))
    let {name , last_name , email , mobile} = JSON.parse(props.user);
    const [userData , setUserData] = useState({name , last_name , email , mobile})

    // if (roles.length !== 0) {
    //     roles = JSON.parse(roles);
    // }
    // role_id = parseInt(role_id);
    // user = JSON.parse(user)
    // this.setState({
    //     id: user.id,
    //     name: user.name,
    //     last_name: user.last_name,
    //     full_name: user.fullname,
    //     email: user.email,
    //     avatar: user.avatar,
    //     mobile: user.mobile,
    //     status: user.status,
    //     roles,
    //     role_id,
    //     is_admin
    // });
    //
    //
    let defaultImg = 'images/avatar.jpg'
    //
    const [imageGet, setImage] = useState({state: ''})
    //
    const [loading, setLoading] = useState(false)
    //
    //
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
    //
    useEffect(() => {
        if (JSON.parse(user).image) {
            let img = JSON.parse(user).image;


            handleGetImg(img)

        } else {
            setImage({state: ''})
        }
    }, [])
    //
    // let userData = JSON.parse(user);
    const [preImage, setPreImage] = useState({uri: defaultImg})
    const [pre, setPre] = useState(false)
    const [file, setFile] = useState({file: ''})
    // const [state, setState] = useState({
    //     id: userData.id,
    //     name: userData.name,
    //     last_name: userData.last_name,
    //     email: userData.email,
    //     mobile: userData.mobile,
    //     // password: userData.password,
    //     role_id: userData.userRole === "user" ? 2 : 1,
    //     status: userData.status
    // })
    //
    // const imagePicker = () => {
    //     warning('در نسخه فعلی انتخاب تصویر آواتار امکان پذیر نیست')
    // }
    //
    // const HandleInput = e => {
    //     e.preventDefault()
    //     setState({
    //         ...state,
    //         [e.target.name]: e.target.value
    //     })
    // }
    //
    // const breadData = {
    //     title: 'ویرایش اطلاعات',
    //     desc: 'ویرایش اطلاعات و پسورد کاربر'
    // };
    //
    // useEffect(() => {
    //     ReactDOM.render(<BreadCrumbs fixed={true} data={breadData}/>, document.getElementById("bradcrummmm"))
    // }, [])
    // const submitForm = () => {
    //
    //
    //     let forms = new FormData();
    //     var pattern = /^0?9{1}([0-9]{9})$/;
    //     let {id, name, last_name, email, mobile, password, role_id} = state;
    //     if (empty(name)) {
    //         return error('وارد کردن نام الزامی است.')
    //     }
    //     if (empty(last_name)) {
    //         return error('وارد کردن نام‌خانوادگی الزامی است.')
    //     }
    //
    //     if (empty(mobile)) {
    //         return error('وارد کردن شماره تلفن‌همراه الزامی است.')
    //     }
    //
    //     if (!pattern.test((mobile))) {
    //         return error('فرمت شماره تلفن اشتباه است.')
    //     }
    //     state._token = token;
    //
    //     if (file.file) {
    //         forms.append("image", file.file);
    //     } else {
    //         if (imageGet.state == '') {
    //             forms.append("image", '');
    //         } else {
    //             forms.append("image", true);
    //         }
    //     }
    //
    //     forms.append("_token", token);
    //
    //     forms.append("name", state.name);
    //     forms.append("id", id);
    //     forms.append("last_name", state.last_name);
    //     forms.append("email", state.email ? state.email : '');
    //     // forms.append("password", state.password);
    //     forms.append("role_id", state.role_id);
    //     forms.append("status", state.status);
    //     // delete 0 from first mobile number
    //     let mobiles = Array.from(mobile);
    //     let FirstNumber = mobiles[0]
    //     if (FirstNumber === 0 || FirstNumber === "0") {
    //         mobiles.shift();
    //         let newMobile = mobiles.join('');
    //         forms.append("mobile", newMobile);
    //
    //         $("#loading-show").addClass("activeLoadingLogin");
    //         Request.UpdateUserDetail(forms, id)
    //             .then(res => {
    //                 $("#loading-show").removeClass("activeLoadingLogin");
    //                 success("اطلاعات ویرایش شد");
    //                 setTimeout(() => {
    //                     // window.location.reload();
    //                 }, 400)
    //             }).catch(error => {
    //             $("#loading-show").removeClass("activeLoadingLogin");
    //             if (error.response.data.errors) {
    //                 ErroHandle(error.response.data.errors)
    //             } else {
    //                 ErrorToast("خطای غیر منتظره ای رخ داده است")
    //             }
    //         })
    //     } else {
    //         forms.append("mobile", state.mobile);
    //
    //         $("#loading-show").addClass("activeLoadingLogin");
    //         Request.UpdateUserDetail(forms, id)
    //             .then(res => {
    //
    //                 $("#loading-show").removeClass("activeLoadingLogin");
    //                 success("اطلاعات ویرایش شد");
    //                 setTimeout(() => {
    //                     // window.location.reload();
    //                 }, 400)
    //             }).catch(error => {
    //             $("#loading-show").removeClass("activeLoadingLogin");
    //             if (error.response.data.errors) {
    //                 ErroHandle(error.response.data.errors)
    //             } else {
    //                 ErrorToast("خطای غیر منتظره ای رخ داده است")
    //             }
    //         })
    //     }
    //
    //
    // }
    //
    const handlePreShowImage = e => {
        e.preventDefault();
        let preImages = {...preImage}
        if (event.target.files && event.target.files[0]) {
            preImages.uri = URL.createObjectURL(event.target.files[0])
            setPreImage(preImages)
        }
    }
    //
    const handleFile = e => {
        e.preventDefault();
        handlePreShowImage(e);
        let filed = {...file};
        filed.file = e.target.files[0];
        setFile(filed);
        setPre(true)
    }
    //
    //
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
    //
    //
    // function adminInputsHandler() {
    //     let {is_admin, roles, role_id, status} = this.state;
    //     if (is_admin) {
    //         return (
    //             <div className={'row col-12 m-0 p-0 '}>
    //                 <div className="form-group col-md-6">
    //                     <div className="controls">
    //                         <label>دسترسی</label>
    //                         <select value={role_id} className="form-control text-left" placeholder="دسترسی"
    //                                 onChange={(e) => {
    //                                     this.setState({role_id: convertDigit(e.target.value)})
    //                                 }}>
    //                             {roles.map((role) => {
    //                                 return (<option value={role.id}>{role.display_name}</option>)
    //                             })}
    //                         </select>
    //                     </div>
    //                 </div>
    //                 <div className="form-group col-md-6">
    //                     <div className="controls">
    //                         <label>وضعیت</label>
    //                         <select value={status} className="form-control text-left" placeholder="دسترسی"
    //                                 onChange={(e) => {
    //                                     this.setState({status: convertDigit(e.target.value)})
    //                                 }}>
    //                             <option value={'active'}>فعال</option>
    //                             <option value={'deactivate'}>غیرفعال</option>
    //                         </select>
    //                     </div>
    //                 </div>
    //
    //             </div>
    //         );
    //     }
    //
    //
    //     let {name, last_name, email, mobile, avatar, status, full_name, id} = this.state;
    //


    const submitForm = (e) => {


        let forms = new FormData();
        var pattern = /^0?9{1}([0-9]{9})$/;
        let {id, name, last_name,, mobile} = userData;
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
        // forms.append("role_id", state.role_id);
        // forms.append("status", state.status);
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
            forms.append("mobile", state.mobile);

            $("#loading-show").addClass("activeLoadingLogin");
            Request.UpdateUserDetail(forms, id)
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


                <form novalidate onSubmit={e => {
                    e.preventDefault();
                    submitForm()
                }}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>نام</label>
                                    <input type="text" className="form-control text-left" placeholder="نام"
                                           value={userData.name} onChange={(e) => {
                                        setUserData({name: e.target.value})
                                    }} required
                                           data-validation-required-message="وارد کردن نام الزامی است"
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>نام خانوادگی</label>
                                    <input type="text" className="form-control" placeholder="نام خانوادگی"
                                           value={userData.last_name} onChange={(e) => {
                                        setUserData({last_name: e.target.value})
                                    }}
                                           required
                                           data-validation-required-message="وارد کردن نام خانوادگی الزامی است"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>ایمیل</label>
                                    <input type="email" className="form-control text-left" placeholder="ایمیل"
                                           value={userData.email} onChange={(e) => {
                                        setUserData({email: e.target.value})
                                    }} required
                                           data-validation-required-message="وارد کردن ایمیل الزامی است" dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>شماره تلفن‌همراه</label>
                                    <input type="tel" className="form-control text-left" placeholder="شماره تلفن‌همراه"
                                           value={userData.mobile} onChange={(e) => {
                                        setUserData({mobile: convertDigit(e.target.value)})
                                    }} required
                                           data-validation-required-message="وارد کردن شماره تلفن‌همراه الزامی است"
                                           dir="ltr"/>
                                </div>
                            </div>
                            {/*{this.adminInputsHandler()}*/}
                        </div>

                        <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                            <button type="submit"
                                    className="btn btn-primary glow mb-1 mb-sm-0 ">ذخیره
                                تغییرات
                            </button>
                        </div>
                    </div>
                </form>

                <div id={"loading-show"} style={{zIndex: 9999, visibility: 'hidden'}}>
                    <Loading/>
                </div>
            </div>
        );
    // }


}
let elementId = 'profile-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Profile {...props}/>, element);
}
