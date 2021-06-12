import React, {useContext} from 'react';
import {FormContextUrl} from "../../../../Helper/Context";


export const InputTextUrl = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormDataUrl} = useContext(FormContextUrl);
    let ActiveCheck = initialFormDataUrl.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataUrl.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
