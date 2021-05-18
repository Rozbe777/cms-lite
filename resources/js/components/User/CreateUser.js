import React, {Component} from "react";
import {convertDigit, empty, error, success, url, warning} from "../../helper";
import Webservice, {POST_METHOD, PUT_METHOD} from "../../classes/webservice";
import ReactDOM from "react-dom";

export default class CreateUser extends Component {

    componentWillMount() {
        let {roles} = this.props;
        roles = JSON.parse(roles);
        let role_id = '';
        if (roles.length !== 0) {
            role_id = roles[0].id;
        }
        this.state = {
            name: '',
            last_name: '',
            email: '',
            avatar: '',
            phone: '',
            password: '',
            role_id,
            roles
        }
    }

    render() {
        let {name, last_name, email, phone, role_id, password, roles} = this.state;

        return (
            <div>

                <div className="media mb-2">
                    <a className="mr-2">
                        <img src={url('images/avatar.jpg')} alt={''}
                             className="users-avatar-shadow rounded-circle" height="64" width="64"/>
                    </a>
                    <div className="media-body">
                        <div className={'row justify-content-between align-items-center pr-2 pl-1'}>

                        </div>
                        <div className="col-12 px-0 d-flex">
                            <a onClick={() => {
                                this.imagePicker();
                            }} className="btn btn-sm btn-primary mr-25 text-white cursor-pointer">انتخاب تصویر
                                آواتار</a>
                            {/*<a href="#" className="btn btn-sm btn-light-secondary">بازنشانی</a>*/}
                        </div>
                    </div>
                </div>

                <form onSubmit={e => {
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
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>شماره تلفن‌همراه</label>
                                    <input type="tel" className="form-control text-left" placeholder="شماره تلفن‌همراه"
                                           value={phone} onChange={(e) => {
                                        this.setState({phone: convertDigit(e.target.value)})
                                    }} required

                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>رمزعبور</label>
                                    <input type="password" className="form-control text-left" placeholder="رمزعبور"
                                           value={password} onChange={(e) => {
                                        this.setState({password: convertDigit(e.target.value)})
                                    }} required
                                           dir="ltr"/>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <div className="controls">
                                    <label>دسترسی</label>
                                    <select className="form-control text-left" placeholder="دسترسی"
                                            onChange={(e) => {
                                                this.setState({role_id: convertDigit(e.target.value)})
                                            }}>
                                        {roles.map((role) => {
                                            return (<option value={role.id}>{role.display_name}</option>)
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

            </div>
        );
    }


    imagePicker() {
        warning('در نسخه فعلی انتخاب تصویر آواتار امکان پذیر نیست!')
    }

    async submitForm() {
        let {name, last_name, email, phone, password, role_id} = this.state;
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
        if (empty(phone)) {
            return error('وارد کردن شماره تلفن‌همراه الزامی است.')
        }
        let {action, token} = this.props;
        let ws = new Webservice();
        ws.url = action;
        ws.method = POST_METHOD;
        ws.body = {name, last_name, email, phone, role_id, password, _token: token}
        try {
            let response = await ws.call()
            let responseJson = await response.json();
            if (responseJson.status) {
                success(responseJson.message);

                this.setState({
                    name: '',
                    last_name: '',
                    email: '',
                    avatar: '',
                    phone: '',
                    password: '',
                    role_id: '',
                })
            } else {
                error(responseJson.message)
            }
        } catch (e) {
            console.error(e);
            error("مشکلی در ارتباط با سرور رخ داده است.")
        }
    }
}
let elementId = 'create-user-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<CreateUser {...props}/>, element);
}
