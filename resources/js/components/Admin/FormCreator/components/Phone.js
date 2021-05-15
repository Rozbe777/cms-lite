import React, {useContext} from "react";
import {FormContextMobile} from "../Helper/Context";
import ReactDOM from "react-dom";
import $ from "jquery";
import {MobileSetting} from "./Setting/MobileSetting";


const Phone = () => {
    const {initialFormDataPhone, setInitialFormDataPhone} = useContext(FormContextMobile);
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextMobile.Provider value={{
            initialFormDataPhone,
            setInitialFormDataPhone
        }}><MobileSetting /></FormContextMobile.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");

    }
    let tags = initialFormDataPhone.Mandatory ? initialFormDataPhone.title ? initialFormDataPhone.title + "(*)" : 'عنوان (*)' : initialFormDataPhone.title ? initialFormDataPhone.title : 'عنوان';


    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label htmlFor={random + "_label"}>{tags}</label>
            <input type="email" id={random + "_label"} className="form-control formcreator"
                   required={initialFormDataPhone.Mandatory == true ? true : false}/>
            <p>
                <small
                    className="text-muted">{initialFormDataPhone.description ? initialFormDataPhone.description : 'توضیحات مختصر فیلد'}</small>
            </p>
        </fieldset>
    )
}

export default Phone;
