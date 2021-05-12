import React, {useContext} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {FormContextEmail} from "../Helper/Context";
import {EmailSetting} from "./Setting/EmailSetting";

const Email = () => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");
    const {initialFormDataEmail, setInitialFormDataEmail} = useContext(FormContextEmail);

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextEmail.Provider value={{
            initialFormDataEmail,
            setInitialFormDataEmail
        }}><EmailSetting/></FormContextEmail.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");

    }
    let tags = initialFormDataEmail.Mandatory ? initialFormDataEmail.title ? initialFormDataEmail.title +  "(*)" : 'عنوان (*)' :  initialFormDataEmail.title ?  initialFormDataEmail.title : 'عنوان';


    return (
            <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
                <label htmlFor={random + "_label"}>{tags}</label>
                <input type="email" id={random + "_label"} className="form-control formcreator"
                       required={initialFormDataEmail.Mandatory == true ? true : false}/>
                <p>
                    <small className="text-muted">{initialFormDataEmail.description ? initialFormDataEmail.description : 'توضیحات مختصر فیلد' }</small>
                </p>
            </fieldset>
    )
}

export default Email;
