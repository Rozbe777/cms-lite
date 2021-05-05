import React from "react";
import ReactDOM from 'react-dom';
import $ from "jquery";

const Index = (props) => {

    const {token} = props;

    const VerifyModal = (e) => {

    }

    return (
        <div  class="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
            <div className="card-header pb-1">
                <div className="card-title">
                    <h4 className="text-center mb-2">خوش آمدید</h4>
                </div>
            </div>



            <div className="card-content">
                <div className="card-body">

                        <div className="form-group mb-50">
                            <label className="text-bold-700" htmlFor="username">
                                شماره تلفن خود را وارد کنید
                            </label>
                            <input  type="text" className="form-control text-left"
                                   id="username"
                                   name="username"
                                   placeholder="شماره تلفن" dir="ltr"/>

                            <button type="submit"
                                    onClick={e => VerifyModal(e)}
                                    style={{marginTop : 15}}
                                    className="btn btn-primary glow w-50 position-relative">ثبت تلفن
                            </button>
                        </div>
                    <hr/>
                    <div className="text-center"><small className="mr-25">قبلا ثبت نام کرده اید؟</small>
                        <a><small>ورود</small></a>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Index;


let element = document.getElementById("register-form")
if (element) {
    var Props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index {...Props} />, element)
}
