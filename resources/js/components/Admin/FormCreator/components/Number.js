import React, {useContext, useEffect, useState} from "react";
import {FormContextNumber} from "../Helper/Context";
import ReactDOM from "react-dom";
import $ from "jquery";
import {NumberSetting} from "./Setting/NumberSetting";

const Number = () => {
    const {initialFormDataNumber, setInitialFormDataNumber} = useContext(FormContextNumber);

    const random = min + Math.random() * (max - min);
    const [minMaxTitle, setMinMaxTitle] = useState('');
    const setting_main_content = document.getElementById("setting_main_content");

    const min = initialFormDataNumber.min;
    const max = initialFormDataNumber.max;
    let titrs = '';
    useEffect(() => {
        if (min > 0) {
            titrs = "عددی بزرگتر از" + min
            setMinMaxTitle(titrs)
        } else if (max > 0) {
            titrs = "عددی کوچکتر از" + max
            setMinMaxTitle(titrs)
        } else if (max > 0 && min > 0) {
            titrs = "عددی بین (" + min + "و" + max + ")"
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
        return (
            <p style={{margin: 0, fontSize: 11, color: 'grey'}}>{value}</p>
        )
    }

    let mintEXT = (<p style={{margin: 0, fontSize: 11, color: 'grey'}}>{minMaxTitle}</p>)

    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label htmlFor={random + "_label"}>{tags}</label>
            {console.log("inininini : ", titrs)}

            <p style={{margin: 0, fontSize: 11, color: 'grey'}}>{titrs}</p>
            <input type="number" id={random + "_label"} className="form-control formcreator"
                   required={initialFormDataNumber.Mandatory == true ? true : false}/>
            <p>
                <small
                    className="text-muted">{initialFormDataNumber.description ? initialFormDataNumber.description : 'توضیحات مختصر فیلد'}</small>
            </p>
        </fieldset>
    )
}

export default Number;
