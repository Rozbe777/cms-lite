import React, {Component} from "react";
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {empty, error, success} from "../../helper";

export default class ChangePassword extends Component {
    constructor() {
        super();
        let {is_admin = 0} = this.props;
        this.state = {
            current_password: '',
            password: '',
            password_confirmation: '',
        }
    }

    render() {
        let {current_password, password, password_confirmation} = this.state;
        return (<form noValidate onSubmit={e => {
            e.preventDefault();
            this.onSubmit()
        }}>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-4">
                    <div className="form-group">
                        <label>رمز عبور فعلی</label>
                        <input className="form-control text-left" name={'current_password'} type="password" dir="ltr"
                               placeholder={'رمزعبور فعلی خود را وارد نمایید'}
                               value={current_password} onChange={(e) => {
                            this.setState({current_password: e.target.value})
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>رمزعبور جدید</label>
                        <input className="form-control text-left" name={'password'} type="password" dir="ltr"
                               placeholder={'رمزعبور جدید خود را وارد نمایید'}
                               value={password} onChange={(e) => {
                            this.setState({password: e.target.value})
                        }}/>
                    </div>
                    <div className="form-group">
                        <label>تکرار رمز عبور جدید</label>
                        <input className="form-control text-left" name={'password_confirmation'} type="password"
                               dir="ltr"
                               placeholder={'تکرار رمزعبور جدید خود را وارد نمایید'}
                               value={password_confirmation} onChange={(e) => {
                            this.setState({password_confirmation: e.target.value})
                        }}/>
                    </div>

                </div>


                <div className="col-12 d-flex flex-sm-row flex-column justify-content-center mt-1">
                    <button type="submit"
                            className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">ذخیره
                        تغییرات
                    </button>

                </div>
            </div>
        </form>);
    }

    async onSubmit() {
        let {token, action} = this.props;
        let {current_password, password, password_confirmation} = this.state;
        if (empty(current_password)) {
            return error('وارد کردن رمزعبور فعلی الزامی است.')
        }
        if (empty(password)) {
            return error('وارد کردن رمزعبور جدید الزامی است.')
        }
        if (empty(password_confirmation)) {
            return error('وارد کردن تکرار رمزعبور جدید الزامی است.')
        }

        let ws = new Webservice();
        ws.url = action;
        ws.method = PUT_METHOD;
        ws.body = {
            _token: token,
            current_password,
            password,
            password_confirmation
        }
        try {
            let response = await ws.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                success(responseJson.message);
                this.setState({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                })
            } else {
                error(responseJson.message)
            }
        } catch (e) {
            console.log(e);
            error('مشکلی در ارتباط با سرور رخ داده است!')
        }
    }
}
let elementId = 'password-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<ChangePassword {...props}/>, element);
}
