import React, {useContext} from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import {FormContextYesNo, FormTheme} from "../Helper/Context";
import {YesNoSetting} from "./Setting/YesNoSetting";


const YesNo = () => {
    const {formTheme} = useContext(FormTheme);
    const setting_main_content = document.getElementById("setting_main_content");
    const {initialFormDataYesNo, setInitialFormDataYesNo} = useContext(FormContextYesNo);

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextYesNo.Provider value={{
            initialFormDataYesNo,
            setInitialFormDataYesNo
        }}><YesNoSetting/></FormContextYesNo.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataYesNo.Mandatory ? initialFormDataYesNo.title ? initialFormDataYesNo.title +  "(*)" : 'عنوان (*)' :  initialFormDataYesNo.title ?  initialFormDataYesNo.title : 'عنوان';

    return (
        <div onClick={e=>HandleClick(e)} className={"col-12"}>
            <p id={"form-creator-p"} style={{fontSize: '11px' ,color : formTheme.textColor}}>{tags}</p>
            <ul className={"list-unstyled"} style={{padding : '0 5px'  , width : '100%' ,borderRadius : 5 , height : '50px',  margin : "8px 0" , background : formTheme.inputBackground}}>

                <li className={"d-inline-block mr-2 mb-1"} style={{float : 'right' , marginRight:'10px' ,marginTop : '9px'}}>
                    <fieldset>
                        <div className={"radio radio-primary"}>
                            <input type={"radio"} name={"yesno"} id={"yes"}/>
                            <label htmlFor={"yes"} style={{color : formTheme.textColor}}>
                                بله
                            </label>
                        </div>
                    </fieldset>
                </li>
                <li className={"d-inline-block mr-2 mb-1"} style={{float : 'right' , marginRight:'10px' ,marginTop : '9px'}}>
                    <fieldset>
                        <div className={"radio radio-primary"}>
                            <input type={"radio"} name={"yesno"} id={"no"}/>
                            <label htmlFor={"no"} style={{color : formTheme.textColor}}>
                                خیر
                            </label>
                        </div>
                    </fieldset>
                </li>
            </ul>
        </div>

    )
}

export default YesNo;
