import React from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
export const BigSwitcher = (props) => {
    $(function (){
        $("input[name="+props.name+"]").on("change" , function (){

            let radioButtons = $("#myFormID input:radio[name="+props.name+"]")
            var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
            console.log("selected : " , selectedIndex);
            $("ul#bigest li").removeClass("act");
            $("ul#bigest li").eq(selectedIndex).addClass("act");

        })
    })
    return (
        <form id={"myFormID"}>
            <div className={"switch-container"}>
                <ul id={"bigest"}>
                    <li className={"deactive act"}>
                        <input type={"radio"} name={props.name}  />
                        {props.valueOne}</li>
                    <li className={"active"}>
                        <input type={"radio"} name={props.name} />
                        {props.valueTow}
                    </li>
                    <li className={"active"}>
                        <input type={"radio"} name={props.name} />
                        {props.valueThree}
                    </li>
                </ul>
            </div>
        </form>
       )
}
