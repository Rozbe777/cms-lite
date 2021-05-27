import React, {useContext} from 'react';
import {FormContextTextArea} from "../../../../Helper/Context";


export const InputTextTextarea = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormDataTextarea} = useContext(FormContextTextArea);
    let ActiveCheck = initialFormDataTextarea.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormDataTextarea.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
