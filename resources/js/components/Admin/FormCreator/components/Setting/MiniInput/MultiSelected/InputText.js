import React, {useContext} from 'react';
import {FormContextMultiSelected} from "../../../../Helper/Context";


export const InputText = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormDataMultiSel} = useContext(FormContextMultiSelected);
    let ActiveCheck = initialFormDataMultiSel.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataMultiSel.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
