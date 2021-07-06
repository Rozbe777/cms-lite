import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import $ from "jquery";
import Loading from "../Auth/Loading";

const Profile = (props) => {

    let {user , token} = props;

    console.log("////))))))___" , JSON.parse(props.user))
    let {name , last_name , email , mobile} = JSON.parse(props.user);
    const [userData , setUserData] = useState({name , last_name , email , mobile})

    let defaultImg = 'images/avatar.jpg'
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
    const [preImage, setPreImage] = useState({uri: defaultImg})
    const [pre, setPre] = useState(false)
    const [file, setFile] = useState({file: ''})



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


    const submitForm = (e) => {


        console.log(userData)
        let forms = new FormData();
        var pattern = /^0?9{1}([0-9]{9})$/;
        let {id, name, last_name, mobile , description} = userData;
        if (empty(userData.name)) {
            return error('وارد کردن نام الزامی است.')
        }
        if (empty(userData.last_name)) {
            return error('وارد کردن نام‌خانوادگی الزامی است.')
        }

        if (empty(userData.mobile)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }

        if (!pattern.test((userData.mobile))) {
            return error('فرمت شماره تلفن اشتباه است.')
        }
        userData._token = token;

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

        forms.append("name", userData.name);
        forms.append("id", id);
        forms.append("last_name", userData.last_name);
        forms.append("description", userData.description);
        forms.append("email", userData.email ? userData.email : '');
        let mobiles = Array.from(mobile);
        let FirstNumber = mobiles[0]
        if (FirstNumber === 0 || FirstNumber === "0") {
            mobiles.shift();
            let newMobile = mobiles.join('');
            forms.append("mobile", newMobile);

            $("#loading-show").addClass("activeLoadingLogin");
            Request.ProfileUpdate(forms)
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
            forms.append("mobile", userData.mobile);

            $("#loading-show").addClass("activeLoadingLogin");
            Request.ProfileUpdate(forms)
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
                                        setUserData({...userData , name: e.target.value})
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
                                        setUserData({...userData , last_name: e.target.value})
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
                                        setUserData({...userData , email: e.target.value})
                                    }}
                                           data-validation-required-message="وارد کردن ایمیل الزامی است" dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>شماره تلفن‌همراه</label>
                                    <input type="tel" className="form-control text-left" placeholder="شماره تلفن‌همراه"
                                           value={userData.mobile} onChange={(e) => {
                                        setUserData({...userData , mobile: convertDigit(e.target.value)})
                                    }} required
                                           data-validation-required-message="وارد کردن شماره تلفن‌همراه الزامی است"
                                           dir="ltr"/>
                                </div>
                            </div>


                            <div className="col-12">
                                <fieldset className="form-group">
                                    <label>توضیحات شخصی</label>
                                    <textarea className="form-control" id="basicTextarea" rows="3"
                                              name={"description"}
                                              value={userData.description}
                                              onChange={(e) => {
                                                  setUserData({...userData , description:e.target.value})
                                              }}
                                              placeholder="توضیحاتی راجع به خودتان تایپ کنید ..."></textarea>
                                </fieldset>
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
