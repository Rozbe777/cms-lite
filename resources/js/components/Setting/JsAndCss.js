import React, {Component} from "react";
import ReactDOM from "react-dom";
import {success} from "../../helper";
import Webservice, {PUT_METHOD} from "../../classes/webservice";

export default class JsAndCss extends Component {
    componentWillMount() {
        let {
            head_include,
            footer_include,
            body_include
        } = this.props;
        this.state = {
            head_include,
            footer_include,
            body_include
        }
    }

    render() {
        let {head_include, footer_include, body_include} = this.state;
        return (
            <form onSubmit={e => {
                e.preventDefault();
                this.onSubmit()
            }}>
                <div className={'row col-12'}>

                    <div className="form-group col-md-12">
                        <label htmlFor="">head css & js</label>
                        <textarea className={'form-control'} row={3}
                                  onChange={(e) => this.setState({head_include: e.target.value})}>{head_include}</textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="">body css & js</label>
                        <textarea className={'form-control'} row={3}
                                  onChange={(e) => this.setState({body_include: e.target.value})}>{body_include}</textarea>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="">footer css & js</label>
                        <textarea className={'form-control'} row={3}
                                  onChange={(e) => this.setState({footer_include: e.target.value})}>{footer_include}</textarea>
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
        );
    }

    async onSubmit() {
        let {head_include, footer_include, body_include} = this.state;
        let {token, action} = this.props;
        let ws = new Webservice();
        ws.url = action;
        ws.method = PUT_METHOD;
        ws.body = {
            _token: token,
            script_head: head_include, script_footer: footer_include, script_top_body: body_include
        }
        try {
            let response = await ws.call();
            let responseJson = await response.json();
            if (responseJson.status) {
                success(responseJson.message);
            } else {
                error(responseJson.message);
            }
        } catch (e) {
            fail();
            console.log(e)
        }
    }
}
let elementId = 'js-and-css-setting-form';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<JsAndCss {...props}/>, element);
}
