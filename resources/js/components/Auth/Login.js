import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {csrf_token, error, url, success, info, warning, empty, redirect} from "../../helper";
import Webservice, {POST_METHOD} from "../../classes/webservice";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        let {action, token} = this.props;

        return (
            <div
                className="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">

                <div className="card-header pb-1">
                    <div className="card-title">
                        <h4 className="text-center mb-2">خوش آمدید</h4>
                    </div>
                </div>

                <div className="card-content">
                    <div className="card-body">

                        <form action={action} method="POST" id={'form'}  onSubmit={e => {
                            e.preventDefault();
                            this.onSubmit()
                        }}>
                            {csrf_token(token)}
                            <div className="form-group mb-50">
                                <label className="text-bold-700" htmlFor="username">نام
                                    کاربری (ایمیل یا شماره موبایل)</label>
                                <input value={this.state.username} onChange={(e) => {
                                    this.setState({username: e.target.value},)
                                }} type="text" className="form-control text-left"
                                       id="username"
                                       name="username"
                                       placeholder="نام کاربری" dir="ltr"/>
                            </div>
                            <div className="form-group">
                                <label className="text-bold-700" htmlFor="password">رمز
                                    عبور</label>
                                <input type="password" className="form-control text-left"
                                       name="password" id="password"
                                       value={this.state.password} onChange={(e) => {
                                    this.setState({password: e.target.value},)
                                }}
                                       placeholder="رمز عبور" dir="ltr"/>
                            </div>
                            <div
                                className="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
                                <div className="text-left">
                                    <div className="checkbox checkbox-sm">
                                        <input type="checkbox" className="form-check-input"
                                               id="exampleCheck1"/>
                                        <label className="checkboxsmall" htmlFor="exampleCheck1"><small>مرا
                                            به خاطر بسپار</small></label>
                                    </div>
                                </div>
                                <div className="text-right line-height-2"><a
                                    href="auth-forgot-password.html"
                                    className="card-link"><small>رمز عبورتان را فراموش کرده
                                    اید؟</small></a></div>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary glow w-100 position-relative">ورود
                            </button>
                        </form>
                        <hr/>
                        <div className="text-center"><small className="mr-25">تا کنون ثبت نام نکرده اید؟</small><a
                            href={url('auth/register')}><small>ثبت نام کنید</small></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async onSubmit() {
        let {username, password} = this.state;
        let {action, token} = this.props;

        if (empty(username)) {
            return error('نام کاربری وارد نشده است!');
        }
        if (empty(password)) {
            return error('رمز عبور وارد نشده است!');
        }
        let ws = new Webservice();
        ws.method = POST_METHOD;
        ws.url = action;
        ws.body = {
            username,
            password,
            fetch: true,
            _token: token
        };
        try {
            let response = await ws.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                success(responseJson.message);
                setTimeout(() => {
                    redirect(responseJson.data.redirect_url)
                }, 1000);
            } else {
                error(responseJson.message)
            }
        } catch (e) {
            console.log(e)
            let responseJson = await e.json();
            error(responseJson.message)
        }

    };
}

let elementId = 'login-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Login {...props}/>, element);
}
