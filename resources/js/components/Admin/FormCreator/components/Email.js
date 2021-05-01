import React from "react";


const Email = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    return (
            <fieldset className="form-group" style={{margin : 7}}>
                <label htmlFor={random + "_label"}>{label ? label : 'این یک متن برای لیبل است'}</label>
                <input type="email" id={random + "_label"} className="form-control formcreator"
                       placeholder={placeHolder ? placeHolder : 'این یک متن هینت میباشد ...'}
                       required={required ? true : false}/>
                <p>
                    <small className="text-muted">لورم ایپسوم متن ساختگی برای ایمیل است ...</small>
                </p>
            </fieldset>
    )
}

export default Email;
