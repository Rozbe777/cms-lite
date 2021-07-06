import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {convertDigit, empty, ErroHandle, error as ErrorToast, error, success, url, warning} from "../../helper";
import {Request} from "../../services/AdminService/Api";
import $ from "jquery";
import Loading from "../Auth/Loading";

export default class Profile extends Component {

    componentWillMount() {

        let {user, is_admin = 0, roles = [], role_id = 0} = this.props;
        if (roles.length !== 0) {
            roles = JSON.parse(roles);
        }
        role_id = parseInt(role_id);
        user = JSON.parse(user)
        this.setState({
            id : user.id,
            name: user.name,
            last_name: user.last_name,
            full_name: user.fullname,
            email: user.email,
            avatar: user.avatar,
            mobile: user.mobile,
            status: user.status,
            roles,
            role_id,
            is_admin
        });

    }

    render() {
        let {name, last_name, email, mobile, avatar, status, full_name , id} = this.state;

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
                    this.submitForm()
                }}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>نام</label>
                                    <input type="text" className="form-control text-left" placeholder="نام"
                                           value={name} onChange={(e) => {
                                        this.setState({name: e.target.value})
                                    }} required
                                           data-validation-required-message="وارد کردن نام الزامی است"
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>نام خانوادگی</label>
                                    <input type="text" className="form-control" placeholder="نام خانوادگی"
                                           value={last_name} onChange={(e) => {
                                        this.setState({last_name: e.target.value})
                                    }}
                                           required
                                           data-validation-required-message="وارد کردن نام خانوادگی الزامی است"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>ایمیل</label>
                                    <input type="email" className="form-control text-left" placeholder="ایمیل"
                                           value={email} onChange={(e) => {
                                        this.setState({email: e.target.value})
                                    }} required
                                           data-validation-required-message="وارد کردن ایمیل الزامی است" dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>شماره تلفن‌همراه</label>
                                    <input type="tel" className="form-control text-left" placeholder="شماره تلفن‌همراه"
                                           value={mobile} onChange={(e) => {
                                        this.setState({mobile: convertDigit(e.target.value)})
                                    }} required
                                           data-validation-required-message="وارد کردن شماره تلفن‌همراه الزامی است"
                                           dir="ltr"/>
                                </div>
                            </div>
                            {this.adminInputsHandler()}
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
    }

    renderStatusBadge() {
        let {is_admin, status} = this.state;
        if (!is_admin) {
            if (status === 'active') {
                return (<div className="badge badge-success">فعال</div>);
            } else {
                return (<div className="badge badge-danger">غیرفعال</div>);
            }
        }

    }

    imagePicker() {
        warning('در نسخه فعلی انتخاب تصویر آواتار امکان پذیر نیست!')
    }

    async submitForm() {
        let {name, last_name, email, mobile} = this.state;
        if (empty(name)) {
            return error('وارد کردن نام الزامی است.')
        }
        if (empty(last_name)) {
            return error('وارد کردن نام‌خانوادگی الزامی است.')
        }
        if (empty(email)) {
            return error('وارد کردن ایمیل الزامی است.')
        }
        if (empty(mobile)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }


        let data = {
            name : this.state.name,
            last_name : this.state.last_name,
            email : this.state.email,
            mobile : this.state.mobile,
            _token : this.props.token
        }

        $("#loading-show").addClass("activeLoadingLogin");

        Request.UpdateUserDetail(data , this.state.id)
            .then(response => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    success("تغییرات ثبت شدند")
                }).catch(error => {
                    $("#loading-show").removeClass("activeLoadingLogin");
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
            })




    }

    adminInputsHandler() {
        let {is_admin, roles, role_id, status} = this.state;
        if (is_admin) {
            return (
                <div className={'row col-12 m-0 p-0 '}>
                    <div className="form-group col-md-6">
                        <div className="controls">
                            <label>دسترسی</label>
                            <select value={role_id} className="form-control text-left" placeholder="دسترسی"
                                    onChange={(e) => {
                                        this.setState({role_id: convertDigit(e.target.value)})
                                    }}>
                                {roles.map((role) => {
                                    return (<option value={role.id}>{role.display_name}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="controls">
                            <label>وضعیت</label>
                            <select value={status} className="form-control text-left" placeholder="دسترسی"
                                    onChange={(e) => {
                                        this.setState({status: convertDigit(e.target.value)})
                                    }}>
                                <option value={'active'}>فعال</option>
                                <option value={'deactivate'}>غیرفعال</option>
                            </select>
                        </div>
                    </div>

                </div>
            );
        }
    }
}
let elementId = 'profile-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Profile {...props}/>, element);
}
