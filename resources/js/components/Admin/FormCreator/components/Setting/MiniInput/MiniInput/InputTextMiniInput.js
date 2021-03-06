import React, {useContext, useState , useEffect} from 'react';
import {FormContextMini} from "../../../../Helper/Context";

export const InputTextMiniInput = ({code , defaultValue ,type, label , name , placeholder , isInvalid , value : pushValue}) => {

    const localInput = "INPUT_ONES";
    const clickInput = "INPUT_CLICK";
    const initializeMini = {description: '', maximum: 0, Mandatory: false, title: ''}


    // let codeIn = code ? code : localStorage.getItem(clickInput);
    const {initialFormDataMiniText} = useContext(FormContextMini);

    let dataOld =initialFormDataMiniText[code] ? initialFormDataMiniText : {[code] : initializeMini};
    let thisData = dataOld[code];

    console.log("nammmmmmmm" , name)

    const [defVal,setDefVal] = useState("");



    let defaultValll = thisData[name] ? thisData[name] : "";



    console.log("defaultttttttt/////// : " , defaultValll);

    let ActiveCheck = dataOld[code].title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={type ? type : "text"} defaultValue={defaultValll ? defaultValll : ""} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!dataOld[code].title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
