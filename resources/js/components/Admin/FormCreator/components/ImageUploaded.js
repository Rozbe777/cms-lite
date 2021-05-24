import React, {useContext} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {FormContextEmail, FormTheme} from "../Helper/Context";
import {EmailSetting} from "./Setting/EmailSetting";

const ImageUploaded = () => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    const {formTheme} = useContext(FormTheme);
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
            <label style={{textAlign: 'left', fontSize: '11px' ,color : formTheme.textColor}} htmlFor={random + "_label"}>{tags}</label>
            <input type="url" id={random + "_label"} className="form-control formcreator"
                   style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                   required={initialFormDataEmail.Mandatory == true ? true : false}/>
            <p>
                <small style={{textAlign: 'left', fontSize: '11px' , color : formTheme.textColor}}>{initialFormDataEmail.description ? initialFormDataEmail.description : 'توضیحات مختصر فیلد' }</small>
            </p>
        </fieldset>
    )
}

export default ImageUploaded;
