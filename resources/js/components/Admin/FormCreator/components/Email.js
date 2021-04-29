import React from "react";


const Email = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    return (
        <div className={"col-6"}>
            <fieldset className="form-group">
                <label htmlFor={random + "_label"}>{label ? label : 'این یک متن برای لیبل است'}</label>
                <input type="email" className="" id={random + "_label"} className="form-control"
                       placeholder={placeHolder ? placeHolder : 'این یک متن هینت میباشد ...'} {required ? 'required' : ''} />
                <p>
                    <small className="text-muted">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم</small>
                </p>
            </fieldset>
        </div>
    )
}

export default Email;
