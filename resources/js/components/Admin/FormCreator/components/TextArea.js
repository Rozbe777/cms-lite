import React from "react";


const Email = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    return (
        <>
            <p id={"form-creator-p"}>چند انتخابیییییی</p>
            <fieldset className="form-label-group" style={{margin : '0 7px'}}>
                <label htmlFor={random + "_label"}>{label ? label : 'این یک متن برای لیبل است'}</label>
                <textarea data-length="20" type="email" id={random + "_label"} className="form-control char-textarea active max-limit formcreator"
                          required={required ? true : false}></textarea>

            </fieldset>
        </>

    )
}

export default Email;
