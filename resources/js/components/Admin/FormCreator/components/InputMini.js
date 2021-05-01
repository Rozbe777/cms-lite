import React from "react";
import $ from 'jquery';

const InputMini = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = Math.round(min + Math.random() * (max - min));
    const handleMini = (e) => {
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => handleMini(e)}>
            <label htmlFor={random + "_label"}>{label ? label : 'این یک متن برای لیبل است'}</label>
            <input style={{textAlign: 'right'}} type="text" id={random + "_label"} className="form-control formcreator"
                   placeholder={placeHolder ? placeHolder : 'این یک متن هینت میباشد ...'}
                   required={required ? true : false}/>
            <p><small className="text-muted">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم</small></p>
        </fieldset>

    )
}

export default InputMini;
