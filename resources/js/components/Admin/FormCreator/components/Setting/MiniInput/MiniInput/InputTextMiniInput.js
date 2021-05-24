import React, {useContext} from 'react';
import {FormContextMini} from "../../../../Helper/Context";

export const InputTextMiniInput = ({defaultValue ,type, label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormDataMiniText} = useContext(FormContextMini);
    let ActiveCheck = initialFormDataMiniText.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={type ? type : "text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataMiniText.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
