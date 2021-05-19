import React, {useEffect} from 'react';
import './../_Shared/style.scss'
import $ from 'jquery'
const InputText = ({type , name, label, defaultAddresss,placeholder,  value: pushValue}) => {

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

            <div className={"form-group"}>
                <label htmlFor={"baseInput"}>{label}</label>
                <input type={type ? type : "text"} min={type == "number" ? 0 : '' }  onChange={e => pushValue(e.target)}  className={"form-control custom-input-mini"} id={"baseInput"} placeholder={placeholder} name={name} />
            </div>

        </div>

    )
}


export default InputText;
