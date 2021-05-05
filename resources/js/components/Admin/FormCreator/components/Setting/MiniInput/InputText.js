import React from 'react';


export const InputText = ({label , name , placeholder , isInvalid , value : pushValue}) => {
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"} onChange={e => pushValue(e.target)}  className={"form-control "+isInvalid} id={"baseInput"} placeholder={placeholder} name={name} />
            {isInvalid ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
