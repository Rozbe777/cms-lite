import React from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
export const Switcher = ({name ,valueActive,valueDeActive , status :pushState}) => {
    $(function (){
        $("input[name="+name+"]").on("change" , function (){
            let status =  $(this).prop("checked");
            pushState(status)
            if ($(this).prop("checked"))
            {
                $("li."+name+".active").removeClass("act");
                $("li."+name+".deactive").addClass("act");

            }else{
                $("li."+name+".active").addClass("act");
                $("li."+name+".deactive").removeClass("act");
            }
        })
    })

    return (
        <div className={"switch-container"}>
            <ul>
                <input type={"checkbox"} name={name} id={"checked"}/>
                <li  className={name+" active act"}>{valueActive}</li>
                <li  className={name+" deactive"}>{valueDeActive}</li>
            </ul>
        </div>
    )
}
