import React, {useContext} from 'react';
import {FormContextEmail} from "../../../../Helper/Context";


export const InputTextPhone = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormDataEmail} = useContext(FormContextEmail);
    let ActiveCheck = initialFormDataEmail.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataEmail.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
