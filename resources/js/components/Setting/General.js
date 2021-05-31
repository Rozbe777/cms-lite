import React, {Component, useState} from "react";
import ReactDOM from "react-dom";
import Webservice, {PUT_METHOD} from "../../classes/webservice";
import {error, fail, success} from "../../helper";
import Loading from "../Auth/Loading";

import {BreadCrumbs} from "../Admin/UserList/HOC/BreadCrumbs";
import $ from "jquery";
export default class General extends Component {
    componentWillMount() {


        const breadData = {
            title: 'تنظیمات',
            desc: 'تنظیمات عمومی سایت'
        };

        let {
            title,
            site_url,
            cron,
            verify_comment_status,
            enable_registration,
            custom_date,
            description,
            tags
        } = this.props;
        this.setState({
            title,
            site_url,
            cron,
            verify_comment_status,
            enable_registration,
            custom_date,
            description,
            tags
        });


        ReactDOM.render(<BreadCrumbs fixed={true} data={breadData} /> , document.getElementById("bradcrummmm"))
    }

    render() {

        let {title, site_url, cron, verify_comment_status, enable_registration, custom_date, description, tags} = this.state;
        return (
            <>
                <form onSubmit={e => {
                    e.preventDefault();
                    this.onSubmit()
                }}>
                    <div className={'row col-12'}>
                        <div className="form-group col-md-6">
                            <label htmlFor="">عنوان سایت</label>
                            <input type="text" className="form-control" name="title"
                                   value={title} onChange={(e) => {
                                this.setState({title: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">آدرس سایت</label>
                            <input type="text" className="form-control" name="site_url"
                                   value={site_url} onChange={(e) => {
                                this.setState({site_url: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">آدرس cron</label>
                            <input type="text" className="form-control" name="site_url"
                                   value={cron} onChange={(e) => {
                                this.setState({cron: e.target.value})
                            }}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">انتشار دیدگاه</label>
                            <select className={'form-control'} value={verify_comment_status} onChange={(e) => {
                                this.setState({verify_comment_status: e.target.value})
                            }}>
                                <option value={0}>نیاز به تایید</option>
                                <option value={1}>بدون نیاز به تایید</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">امکان عضویت کاربران</label>
                            <select className={'form-control'} value={enable_registration} onChange={(e) => {
                                this.setState({enable_registration: e.target.value})
                            }}>
                                <option value={0}>غیرفعال</option>
                                <option value={1}>فعال</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">نحوه نمایش تاریخ</label>
                            <select className={'form-control'} value={custom_date} onChange={(e) => {
                                this.setState({custom_date: e.target.value})
                            }}>
                                <option value={'ago'}>10 دقیقه پیش</option>
                                <option value={'l d F Y'}>شنبه ۰۱ فروردین ۱۴۰۰</option>
                                <option value={'h:i Y/d/m'}>1400/01/01 09:15</option>
                                <option value={'Y/d/m'}>1400/01/01</option>
                                <option value={'h:i Y-d-m'}>1400-01-01 09:15</option>
                                <option value={'Y-d-m'}>1400-01-01</option>
                                <option value={'normal'}>2021-01-01 09:15</option>
                                <option value={'normal_no_second'}>2021-01-01</option>
                                <option value={0}>تاریخ نمایش داده نشود</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">توضیحاتی درباره وب سایت</label>
                            <textarea className={'form-control'} row={3}
                                      onChange={(e) => this.setState({description: e.target.value})}>{description}</textarea>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="">برچسب های وب سایت</label>
                            <textarea className={'form-control'} row={3}
                                      onChange={(e) => this.setState({tags: e.target.value})}>{tags}</textarea>
                        </div>
                        <div
                            className="col-12 d-flex flex-sm-row flex-column justify-content-end m-0 p-0 mr-3 mr-sm-0 ml-sm-2">
                            <button type="submit"
                                    className="btn btn-primary glow mr-sm-1 mt-1">ذخیره
                                تغییرات
                            </button>
                        </div>
                    </div>

                </form>

                <div className={"changeProfielPass"} id={"loading-show"} style={{zIndex: 9999, visibility: 'hidden'}}>
                    <Loading/>
                </div>
            </>

        );
    }

    async onSubmit() {
        let {title, site_url, cron, verify_comment_status, enable_registration, custom_date, description, tags} = this.state;
        let {token, action} = this.props;
        let ws = new Webservice();
        ws.url = action;
        ws.method = PUT_METHOD;
        ws.body = {
            _token: token,
            title, site_url, cron, auto_comment_accept:verify_comment_status, join:enable_registration, date_time:custom_date, description, keywords:tags
        }
        try {
            $(".changeProfielPass").addClass("activeLoadingLogin");
            let response = await ws.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                $(".changeProfielPass").removeClass("activeLoadingLogin");
                success(responseJson.message);
            } else {
                $(".changeProfielPass").removeClass("activeLoadingLogin");
                error(responseJson.message);
            }
        } catch (e) {
            fail();
            $(".changeProfielPass").removeClass("activeLoadingLogin");
            console.log(e)
        }
    }

}
let elementId = 'general-setting-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<General {...props}/>, element);
}
