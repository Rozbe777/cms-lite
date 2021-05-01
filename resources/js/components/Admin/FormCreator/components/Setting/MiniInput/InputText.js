import React from 'react';


export const InputText = ({label , name , placeholder , isInvalid}) => {
    return (
        <div className={"form-group"}>
            <label htmlFor={"baseInput"}>{label}</label>
            <input type={"text"}  className={"form-control "+isInvalid} id={"baseInput"} placeholder={placeholder} name={name} />
            {isInvalid ? (
                <div className="invalid-feedback">
                    <i className="bx bx-radio-circle"></i>
                    وارد کردن این فیلد الزامی است.
                </div>
            ): ''}
        </div>
    )
}
