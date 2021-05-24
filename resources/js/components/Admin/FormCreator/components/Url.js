import React, {useContext} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {FormContextUrl, FormTheme} from "../Helper/Context";
import {UrlSetting} from "./Setting/UlrSetting";


const Url = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    const {formTheme} = useContext(FormTheme);
    const setting_main_content = document.getElementById("setting_main_content");
    const {initialFormDataUrl, setInitialFormDataUrl} = useContext(FormContextUrl);

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextUrl.Provider value={{
            initialFormDataUrl,
            setInitialFormDataUrl
        }}><UrlSetting/></FormContextUrl.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataUrl.Mandatory ? initialFormDataUrl.title ? initialFormDataUrl.title +  "(*)" : 'عنوان (*)' :  initialFormDataUrl.title ?  initialFormDataUrl.title : 'عنوان';

    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label style={{textAlign: 'left', fontSize: '11px' ,color : formTheme.textColor}} htmlFor={random + "_label"}>{tags}</label>
                <input type="url" id={random + "_label"} className="form-control formcreator url"
                       style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                       placeholder={placeHolder ? placeHolder : 'http://'}
                       required={required ? true : false}/>
                <p>
                    <small style={{textAlign: 'left', fontSize: '11px' , color : formTheme.textColor}}>{initialFormDataUrl.description ? initialFormDataUrl.description : 'توضیحات مختصر فیلد' }</small>
                </p>
            </fieldset>
    )
}

export default Url;
