import React from 'react';
import $ from 'jquery';

export const CheckBox = ({defaultState, name, valueActive, valueDeActive, status: pushState}) => {

    const handleChange = e => {
        // console.log("checked : " , e.target)
        if (e.target.checked){

            pushState(true)
        }else{

            pushState(false)
        }
    }



    return (
        <div className={"checkbox-mini"}>
            <span>فیلد اجباری باشد؟</span>

            <div className={"switch-container formcreator-switch"}>

                <div className="custom-control custom-switch mr-2 mb-1">
                    <input type="checkbox" className="custom-control-input" id="customSwitch11" defaultChecked={defaultState} onChange={e => handleChange(e)}  />
                    <label className="custom-control-label" htmlFor="customSwitch11">

                    </label>
                </div>

            </div>
        </div>
    )
}



