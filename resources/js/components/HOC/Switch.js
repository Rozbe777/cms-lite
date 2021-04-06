import React from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
export const Switcher = (props) => {
    $(function (){
        $("input[name="+props.name+"]").on("change" , function (){
            if ($(this).prop("checked"))
            {
                $("li."+props.name+".active").removeClass("act");
                $("li."+props.name+".deactive").addClass("act");

            }else{
                $("li."+props.name+".active").addClass("act");
                $("li."+props.name+".deactive").removeClass("act");
            }
        })
    })
    return (
        <div className={"switch-container"}>
            <ul>
                <input type={"checkbox"} name={props.name} id={"checked"}/>
                <li className={props.name+" active act"}>{props.valueActive}</li>
                <li className={props.name+" deactive"}>{props.valueDeActive}</li>
            </ul>
        </div>
    )
}
