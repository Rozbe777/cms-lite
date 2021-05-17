import React, {useContext} from 'react';
import {FormContextNumber} from "../../../../Helper/Context";

export const InputTextNumberNum = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue , max , min}) => {

    const {initialFormDataNumber} = useContext(FormContextNumber);
    let ActiveCheck = initialFormDataNumber.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"number"} min={min} max={max} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataNumber.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
