import React, {useContext, useEffect, useState} from "react";
import {FormContextNumber , FormTheme} from "../Helper/Context";
import ReactDOM from "react-dom";
import $ from "jquery";
import {NumberSetting} from "./Setting/NumberSetting";

const Number = () => {
    const {initialFormDataNumber, setInitialFormDataNumber} = useContext(FormContextNumber);
    const {formTheme} = useContext(FormTheme);
    const random = min + Math.random() * (max - min);
    const [minMaxTitle, setMinMaxTitle] = useState('');
    const setting_main_content = document.getElementById("setting_main_content");

    const min = initialFormDataNumber.min;
    const max = initialFormDataNumber.max;
    let titrs = '';
    useEffect(() => {
        if (min > 0) {
            titrs = " پاسخ باید بیشتر از " + min
            setMinMaxTitle(titrs)
        } else if (max > 0) {
            titrs = " پاسخ باید کمتر از " + max
            setMinMaxTitle(titrs)
        } else if (max > 0 && min > 0) {
            titrs = "پاسخ باید بین (" + min + "و" + max + ")باشد"
            setMinMaxTitle(titrs)
        } else {
        }
    }, [])


    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextNumber.Provider value={{
            initialFormDataNumber,
            setInitialFormDataNumber
        }}><NumberSetting/></FormContextNumber.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataNumber.Mandatory ? initialFormDataNumber.title ? initialFormDataNumber.title + "(*)" : 'عنوان (*)' : initialFormDataNumber.title ? initialFormDataNumber.title : 'عنوان';





    const ShowTitrs = (value) => {
        let titrl = " پاسخ باید بیشتر از " + min;
        return (
            <p style={{margin: 0, fontSize: 11, color: 'grey'}}>{titrl}</p>
        )
    }
    {console.log("inininini : ", initialFormDataNumber)}
    let titr_min = " حداقل پاسخ " + initialFormDataNumber.min;
    let titr_max = "حداکثر پاسخ" + initialFormDataNumber.max;
    let titr_between =  "محدوده پاسخ بین ( " + initialFormDataNumber.min + " و " + initialFormDataNumber.max + " )";

    function checked(){
        if (initialFormDataNumber.min > 0 && initialFormDataNumber.max ==0){
            return titr_min;
        }else if(initialFormDataNumber.min == 0 && initialFormDataNumber.max > 0){
            return titr_max;
        }else if(initialFormDataNumber.min > 0 && initialFormDataNumber.max > 0){
            return  titr_between;
        }else{

        }
    }

    let mintEXT = (<p style={{margin: 0, fontSize: 11, color: 'grey'}}>{minMaxTitle}</p>)
    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label style={{textAlign: 'left', fontSize: '11px' ,color : formTheme.textColor}} htmlFor={random + "_label"}>{tags}</label>

            <input type="number" id={random + "_label"} className="form-control formcreator"
                   style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                   required={initialFormDataNumber.Mandatory == true ? true : false}/>
            <p style={{width : '50%' ,float : 'right'}}>
                <small style={{textAlign: 'left', fontSize: '11px' , color : formTheme.textColor}}>{initialFormDataNumber.description ? initialFormDataNumber.description : 'توضیحات مختصر فیلد'}</small>
            </p>
            <p id={"between-answer"} style={{margin: 0, fontSize: 11, color: formTheme.textColor , width : '50%'}}>{checked()}</p>
        </fieldset>
    )
}

export default Number;
