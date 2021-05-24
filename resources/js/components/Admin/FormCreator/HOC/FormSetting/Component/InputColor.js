import React from 'react';
import './../_Shared/style.scss';
import $ from 'jquery';

export const InputColor = ({label, name, status: pushState}) => {

    const handleChange = e => {
        // console.log("checked : " , e.target)
        if (e.target.checked) {
            pushState(true)
        } else {

            pushState(false)
        }
    }


    return (
        <div className={"col-12"} style={{marginBottom: '15px' , padding : 0}}>
            <div className={"checkbox-mini frmSett"}>
                <span style={{marginTop: 11, fontSize: 11}}>{label}</span>

                <div className={"switch-container formcreator-switch"} style={{margin: 0}}>
                    <div className={"close-color"} style={{marginLeft: 10 , marginTop : 6}}>
                        <input defaultValue="#f0f0f0" name={name} type={"color"}/>
                    </div>
                </div>
            </div>
        </div>

    )
}



