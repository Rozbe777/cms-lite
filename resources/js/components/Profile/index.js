import React from "react";
import ReactDOM from "react-dom";
import UpdateUser from "../User/UpdateUser";
import PasswordSet from "../User/PasswordSet";
import Address from "./Address";

const Index = (props) => {


    return (
        <div className="card">
            <div className="card-content">
                <div className="card-body">
                    <ul className="nav nav-tabs mb-2" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center active" id="account-tab"
                               data-toggle="tab" href="#account" aria-controls="account" role="tab"
                               aria-selected="true">
                                <i className="bx bx-user mr-25"></i><span
                                className="d-none d-sm-block"> اطلاعات کاربری</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" id="password-tab" data-toggle="tab"
                               href="#password" aria-controls="password" role="tab" aria-selected="false">
                                <i className="bx bx-lock-alt mr-25"></i><span
                                className="d-none d-sm-block">رمزعبور</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" id="address-tab" data-toggle="tab"
                               href="#address" aria-controls="address" role="tab" aria-selected="false">
                                <i className="bx bx-lock-alt mr-25"></i><span
                                className="d-none d-sm-block">آدرس ها</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active show" id="account" aria-labelledby="account-tab"
                             role="tabpanel">

                            <UpdateUser token={props.token}/>
                        </div>
                        <div className="tab-pane show" id="password" aria-labelledby="password-tab"
                             role="tabpanel">

                            <PasswordSet token={props.token}/>
                        </div>

                        <div className="tab-pane show" id="address" aria-labelledby="address-tab"
                             role="tabpanel">

                            <Address token={props.token}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;

let elementId = 'users-profile';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index {...props}/>, element);
}

