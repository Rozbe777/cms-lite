import React from 'react';
import './_Shared/style.scss'
import $ from 'jquery';

export const Switcher = ({handleSwitchStatus , defaultState, name, valueActive, valueDeActive, status: pushState}) => {
    $(function () {
        $("input[name=" + name + "]").on("change", function (e) {
            let status = $(this).prop("checked");
            if (pushState){
                pushState(status)
            }
            handleSwitchStatus(e , status);
            if (status) {
                $("li." + name + ".active").addClass("act");
                $("li." + name + ".deactive").removeClass("act");
            } else {
                $("li." + name + ".active").removeClass("act");
                $("li." + name + ".deactive").addClass("act");
            }
        })
    })
    return (
        <div className={"switch-container"}>
            {defaultState ? (
                <ul>
                    <input defaultChecked={true} type={"checkbox"} name={name} id={"checked"}/>
                    <li className={name + " active act"}>{valueActive}</li>
                    <li className={name + " deactive"}>{valueDeActive}</li>
                </ul>
            ) : (
                <ul>
                    <input defaultChecked={false} type={"checkbox"} name={name} id={"checked"}/>
                    <li className={name + " active"}>{valueActive}</li>
                    <li className={name + " deactive act"}>{valueDeActive}</li>
                </ul>
            )}
        </div>
    )
}
