import React, {useState} from "react";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import Loading from "../Auth/Loading";
import ReactDOM from "react-dom";
import $ from "jquery";

const CreateUser = (props) => {

    // let {name, last_name, email, phone, role_id, password, roles} = state;

    let defaultImg = 'images/avatar.jpg'
    const {token , roles} = props;
    const [preImage , setPreImage] = useState({uri : defaultImg})
    const [pre , setPre] = useState(false)
    const [file , setFile] = useState({files : ''})
    const [state, setState] = useState({
        name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        role_id: '1',
        status : 'active'
    })



    const HandleInput = e => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {


        let formDatas = new FormData();
        formDatas.append("name" , state.name);
        formDatas.append("last_name" , state.last_name);
        formDatas.append("email" , state.email ? state.email : '');
        formDatas.append("mobile" , state.mobile);
        formDatas.append("password" , state.password);
        formDatas.append("role_id" , state.role_id);
        formDatas.append("status" , state.status);
        var pattern = /^0?9{1}([0-9]{9})$/;
        let {name, last_name, email, mobile, password, role_id} = state;
        if (empty(name)) {
            return error('وارد کردن نام الزامی است.')
        }
        if (empty(last_name)) {
            return error('وارد کردن نام‌خانوادگی الزامی است.')
        }
        if (empty(email)) {
            return error('وارد کردن ایمیل الزامی است.')
        }
        if (empty(password)) {
            return error('وارد کردن رمز عبور الزامی است.')
        }
        if (empty(mobile)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }

        if (!pattern.test((mobile))) {
            return error('فرمت شماره تلفن اشتباه است.')
        }
        // state._token = token;
        formDatas.append("_token" , token);
        formDatas.append("image" , file.files ? file.files : '');


        // delete 0 from first mobile number
        let mobiles = Array.from(mobile);
        let FirstNumber = mobiles[0]
        if (FirstNumber === 0 || FirstNumber === "0")
        {
            mobiles.shift();


            let newMobile = mobiles.join('');
            // state.mobile = newMobile;
            formDatas.append("mobile" , newMobile);
            $("#loading-show").addClass("activeLoadingLogin");
            Request.CreateUserNew(formDatas)
                .then(res => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("کاربر جدید با موفقیت اضافه شد");
                    setTimeout(()=>{
                        // window.location.reload();
                    } , 400)
                }).catch(error => {
                $("#loading-show").removeClass("activeLoadingLogin");
                if (error.response.data.errors) {
                    ErroHandle(error.response.data.errors)
                } else {
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }
            })
        }else{
            $("#loading-show").addClass("activeLoadingLogin");
            formDatas.append("mobile" , mobile);

            Request.CreateUserNew(formDatas)
                .then(res => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("کاربر جدید با موفقیت اضافه شد");
                    setTimeout(()=>{
                        // window.location.reload();
                    } , 400)
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
        filed.files = e.target.files[0];
        setFile(filed);
        setPre(true)


    }


    const handledelImg = (e) => {
        e.preventDefault();

        let preImages = {...preImage}
        preImages.uri = defaultImg;
        setPreImage(preImages)
        setPre(false)
    }



    return (
        <div>
            <div className="media mb-2" style={{display: 'flex', alignItems: 'center', flexDirection: 'row' , position : 'relative' , justifyContent : 'center'}}>
                {pre ? (
                    <img  src={preImage.uri} alt={''}
                          className="users-avatar-shadow rounded-circle" height="120" width="120"/>
                ):(
                    <img  src={url(preImage.uri)} alt={''}
                          className="users-avatar-shadow rounded-circle" height="120" width="120"/>
                )}

                <span id={"choise-img"}>
                    <i className={"bx bx-camera"}></i>

                    <input type={"file"} onChange={e => handleFile(e)} style={{opacity : 0 , position : 'absolute' , right : 0 , cursor : 'pointer'}}
                    />
                </span>

                <span id={"choise-img"} onClick={e => handledelImg(e)} style={{right : 0 , left : '-75px'}} >
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
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>رمزعبور</label>
                                <input type="password" className="form-control text-left" placeholder="رمزعبور"
                                       autoComplete={"off"}
                                       name={"password"}
                                       value={state.password ? state.password : ''}
                                       onChange={(e) => {
                                           HandleInput(e)
                                       }} required
                                       dir="ltr"/>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="controls">
                                <label>دسترسی</label>
                                <select name={"role_id"} className="form-control text-left" placeholder="دسترسی"
                                        style={{height: 50}}
                                        onChange={(e) => {
                                            HandleInput(e)
                                        }}>
                                    {JSON.parse(roles).map((role , index) => {
                                        return (<option key={index} value={role.id}>{role.display_name}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                        <button type="submit"
                                className="btn btn-primary glow mb-1 mb-sm-0 ">ایجاد کاربر جدید
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
export default CreateUser;

let elementId = 'create-user-form-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<CreateUser {...props}/>, element);
}

