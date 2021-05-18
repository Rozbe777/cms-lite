import React, {useContext} from "react";
import {TextAreaSetting} from './Setting/TextAreaSetting'
import ReactDOM from 'react-dom';
import {FormContextTextArea,FormTheme} from './../Helper/Context'

const Email = ({label, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    const setting_main_content = document.getElementById("setting_main_content");
    const {initialFormDataTextarea, setInitialFormDataTextarea} = useContext(FormContextTextArea)
    const {formTheme} = useContext(FormTheme);
    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextTextArea.Provider value={{
            initialFormDataTextarea,
            setInitialFormDataTextarea
        }}><TextAreaSetting/>
        </FormContextTextArea.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataTextarea.Mandatory ? initialFormDataTextarea.title ? initialFormDataTextarea.title + "(*)" : 'عنوان (*)' : initialFormDataTextarea.title ? initialFormDataTextarea.title : 'عنوان';


    return (
        <div onClick={e => HandleClick(e)}>
            <p id={"form-creator-p"} style={{padding : '0 10px', fontSize: '11px' ,color : formTheme.textColor}}>{tags}</p>
            <fieldset className="form-label-group" style={{margin: '0 7px'}}>
                <label htmlFor={random + "_label"}></label>
                <textarea data-length="20" type="email" id={random + "_label"}
                          style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                          className="form-control char-textarea active max-limit formcreator"
                          required={required ? true : false}></textarea>

            </fieldset>
        </div>

    )
}

export default Email;
