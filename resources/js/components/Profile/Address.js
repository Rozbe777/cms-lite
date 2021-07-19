import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import $ from "jquery";
import Loading from "../Auth/Loading";

const Address = (props) => {


    console.log("_____" , JSON.parse(props.user))
    let {user , token} = props;

    let {name , last_name , email , mobile , description} = JSON.parse(props.user);
    const [userData , setUserData] = useState({name , last_name , email , mobile , description})

    let defaultImg = 'images/avatar.jpg'
    const [imageGet, setImage] = useState({state: ''})


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


        let userDataClone = {...userData}
        forms.append("_token", token);

        forms.append("name", userData.name);
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


                <form novalidate onSubmit={e => {
                    e.preventDefault();
                    submitForm()
                }}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>استان</label>
                                    <input type="text" className="form-control text-left" placeholder="استان"
                                           value={userData.state} onChange={(e) => {
                                        setUserData({...userData , state: e.target.value})
                                    }}
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>شهر</label>
                                    <input type="text" className="form-control" placeholder="شهر"
                                           value={userData.city} onChange={(e) => {
                                        setUserData({...userData , city: e.target.value})
                                    }}
                                       />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>کد پستی</label>
                                    <input type="number" className="form-control text-left" placeholder="کد پستی"
                                           value={userData.postal_code} onChange={(e) => {
                                        setUserData({...userData , postal_code: convertDigit(e.target.value)})
                                    }}
                                           dir="ltr"/>
                                </div>
                            </div>

                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>تلفن محل سکونت</label>
                                    <input type="number" className="form-control text-left" placeholder="تلفن محل سکونت"
                                           value={userData.phone} onChange={(e) => {
                                        setUserData({...userData , phone: convertDigit(e.target.value)})
                                    }}
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <fieldset className="form-group">
                                    <label>آدرس کامل</label>
                                    <textarea className="form-control" id="basicTextarea" rows="3"
                                              name={"description"}
                                              value={userData.address ? userData.address : ''}
                                              onChange={(e) => {
                                                  setUserData({...userData , address:e.target.value})
                                              }}
                                              placeholder="آدرس کامل محل سکونتتان را بنویسید ..."></textarea>
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

export default Address;
let elementId = 'address-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Address {...props}/>, element);
}
