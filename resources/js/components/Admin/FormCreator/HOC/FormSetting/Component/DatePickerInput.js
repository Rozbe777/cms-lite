import React, {useEffect} from 'react';
import './../_Shared/style.scss'
import $ from 'jquery'
const DatePickerInput = ({name, label, defaultAddresss, value: pushValue}) => {

    useEffect(()=>{
        // $("input").focus(function (){
        //     $(".addressInput").addClass("active");
        // })
        // $("input").blur(function (){
        //     $(".addressInput").removeClass("active");
        // })

    },[])


    return (
        <div className={"col-12"}>

            <label htmlFor={"baseInput"}>{label}</label>

            <fieldset className="form-group position-relative has-icon-left">
                <input type="text" className="form-control shamsi-datepicker" placeholder="انتخاب تاریخ" />
                    <div className="form-control-position">
                        <i className="bx bx-calendar"></i>
                    </div>
            </fieldset>

        </div>

    )
}


export default DatePickerInput;
