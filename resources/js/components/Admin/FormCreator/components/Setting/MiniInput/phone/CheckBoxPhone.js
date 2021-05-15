import React from 'react';
import $ from 'jquery';

export const CheckBoxPhone = ({defaultState, name, valueActive, valueDeActive, status: pushState}) => {

    const handleChange = e => {
        if (e.target.checked){
            $("li." + name + ".active").addClass("act");
            $("li." + name + ".deactive").removeClass("act");
            pushState(false)
        }else{
            $("li." + name + ".active").removeClass("act");
            $("li." + name + ".deactive").addClass("act");
            pushState(true)
        }
    }



    return (
        <div className={"checkbox-mini"}>
            <span>فیلد اجباری باشد؟</span>

            <div className={"switch-container formcreator-switch"}>
                {defaultState == false ? (
                    <ul>
                        <input defaultChecked={true} type={"checkbox"} name={name} onChange={e => handleChange(e)}
                               id={"checked"}/>
                        <li className={name + " active act"}>{valueActive}</li>
                        <li className={name + " deactive"}>{valueDeActive}</li>
                    </ul>
                ) : (
                    <ul>
                        <input defaultChecked={false} type={"checkbox"} name={name} id={"checked"} onChange={e => handleChange(e)} />
                        <li className={name + " active"}>{valueActive}</li>
                        <li className={name + " deactive act"}>{valueDeActive}</li>
                    </ul>
                )}
            </div>
        </div>
    )
}



