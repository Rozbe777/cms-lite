import React, {useContext} from 'react';
import {FormContext} from "../../../Helper/Context";


export const InputText = ({defaultValue , label , name , placeholder , isInvalid , value : pushValue}) => {

    const {initialFormData,setInitialFormData} = useContext(FormContext);
    let ActiveCheck = initialFormData.input_3.title ? "" : isInvalid;
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} defaultValue={defaultValue} onChange={e => pushValue(e.target)}  className={"form-control "+ActiveCheck} id={"baseInput"} placeholder={placeholder} name={name} />
            {!initialFormData.input_3.title ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
