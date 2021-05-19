import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {convertDigit, empty, error, success, warning} from "../../helper";


export default class Profile extends Component {

    componentWillMount() {

        let {user, is_admin = 0, roles = [], role_id = 0} = this.props;
        if (roles.length !== 0) {
            roles = JSON.parse(roles);
        }
        role_id = parseInt(role_id);
        user = JSON.parse(user)
        this.setState({
            name: user.name,
            last_name: user.last_name,
            full_name: user.fullname,
            email: user.email,
            avatar: user.avatar,
            phone: user.phone,
            status: user.status,
            roles,
            role_id,
            is_admin
        });

    }

    render() {
        let {name, last_name, email, phone, avatar, status, full_name} = this.state;

        return (
            <div>

                <div className="media mb-2">
                    <a className="mr-2">
                        <img src={avatar} alt={full_name}
                             className="users-avatar-shadow rounded-circle" height="64" width="64"/>
                    </a>
                    <div className="media-body">
                        <div className={'row justify-content-between align-items-center pr-2 pl-1'}>


                            <h4 className="media-heading">{full_name}</h4>

                            {this.renderStatusBadge()}
                        </div>
                        <div className="col-12 px-0 d-flex">
                            <a onClick={() => {
                                this.imagePicker();
                            }} className="btn btn-sm btn-primary mr-25 text-white cursor-pointer">تغییر تصویر آواتار</a>
                            {/*<a href="#" className="btn btn-sm btn-light-secondary">بازنشانی</a>*/}
                        </div>
                    </div>
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
                                           value={phone} onChange={(e) => {
                                        this.setState({phone: convertDigit(e.target.value)})
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
        let {name, last_name, email, phone} = this.state;
        if (empty(name)) {
            return error('وارد کردن نام الزامی است.')
        }
        if (empty(last_name)) {
            return error('وارد کردن نام‌خانوادگی الزامی است.')
        }
        if (empty(email)) {
            return error('وارد کردن ایمیل الزامی است.')
        }
        if (empty(phone)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }
        let ws = new Webservice();
        ws.url = this.props.action;
        ws.method = PUT_METHOD;
        ws.body = {name, last_name, email, phone, _token: this.props.token}
        try {
            let response = await ws.call()
            let responseJson = await response.json();
            if (responseJson.status) {
                success(responseJson.message);
                this.setState({
                    full_name: responseJson.data.user.fullname
                })
            } else {
                error(responseJson.message)
            }
        } catch (e) {
            error("مشکلی در ارتباط با سرور رخ داده است.")
        }
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
