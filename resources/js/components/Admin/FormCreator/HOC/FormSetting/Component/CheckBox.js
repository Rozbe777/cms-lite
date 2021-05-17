import React from 'react';
import './../_Shared/style.scss';
import $ from 'jquery';

export const CheckBox = ({defaultState,label, name, valueActive, valueDeActive, status: pushState}) => {

    const handleChange = e => {
        // console.log("checked : " , e.target)
        if (e.target.checked){
            pushState(true)
        }else{

            pushState(false)
        }
    }



    return (
        <div className={"col-12"} style={{marginBottom : '15px'}}>
            <div className={"checkbox-mini frmSett"}>
                <span style={{marginTop : 11 , fontSize : 11}}>{label}</span>

                <div className={"switch-container formcreator-switch"} style={{margin : 0 , width : '23%'}}>
                    <div className="custom-control custom-switch mr-2 mb-1">
                        <input type="checkbox" className="custom-control-input" id={name} defaultChecked={defaultState} onChange={e => handleChange(e)}  />
                        <label className="custom-control-label" htmlFor={name}></label>
                    </div>

                </div>
            </div>
        </div>

    )
}



