import React, {useContext} from 'react';
import "swiper/swiper-bundle.css";
import ReactDOM from "react-dom";
import {OneSelectedSetting} from './Setting/OneSelectedSetting'
import $ from "jquery";
import {ONE_OPTION_DATA} from "./Constant";
import {FormContext ,FormTheme} from "../Helper/Context";
// import './_Shared/styleAction.scss'

export const OneSelected = ({data}) => {

    const setting_main_content = document.getElementById("setting_main_content");
    const {formTheme} = useContext(FormTheme);
    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#options").toggleClass("active");
        $(".options i#droper").toggleClass("active");
    }

    const {initialFormData , setInitialFormData} = useContext(FormContext);


    const HandleClick = e => {
        e.preventDefault();
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
        ReactDOM.render(<FormContext.Provider value={{initialFormData , setInitialFormData}}><OneSelectedSetting  /></FormContext.Provider>, setting_main_content);
    }


    let tags = initialFormData.Mandatory ? initialFormData.title ? initialFormData.title +  "(*)" : 'برچسپ (*)' :  initialFormData.title ?  initialFormData.title : 'برچسپ';
    return (
        <div onClick={e => HandleClick(e)}>
            <p id={"form-creator-p"} style={{color : formTheme.textColor}}>{tags}</p>
            <div className={"main-selected"} style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}>
                <div className={"show-chipset-multi optionss"}>
                    <div id={"box-droper"} className={"options formcreatordroper"} onClick={e => handleDropDown(e)}>
                        <i className={"bx bx-chevron-down"} style={{color : formTheme.placeholderColor}} id={"droper"}></i>
                    </div>
                    <span id={"sorting"} onClick={e => handleDropDown(e)}>انتخاب کنید</span>
                    <div className={"optionBox formcreator"} id={"options"}>
                        <ul id={"options"} onClick={e => handleDropDown(e)}>
                            {initialFormData.Options.length > 0 ? initialFormData.Options.map(item => (
                                <li>{item}</li>
                            )):(
                                <li>لطفا گزینه برای انتخاب اضافه کنید!</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
