import React from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
export const BigSwitcher = ({name ,defaultStatus, valueOne ,valueTow ,valueThree , status:pushStatus }) => {

    console.log("default value : " , defaultStatus);


    $(function (){
        $("input[name="+name+"]").on("change" , function (){
            let content = $(this).attr("cont");
            console.log("default content big  : " , content);
            pushStatus(content);
            let radioButtons = $("#myFormID input:radio[name="+name+"]")
            var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
            $("ul#bigest li").removeClass("act");
            $("ul#bigest li").eq(selectedIndex).addClass("act");

        })
    })
    return (
        <form id={"myFormID"}>
            <div className={"switch-container"}>
                <ul id={"bigest"}>
                    <li className={"deactive act"}>
                        <input cont={"false"} type={"radio"} name={name}  />
                        {valueOne}</li>
                    <li className={"active"}>
                        <input cont={"nf"} type={"radio"} name={name} />
                        {valueTow}
                    </li>
                    <li className={"active"}>
                        <input cont={"nn"} type={"radio"} name={name} />
                        {valueThree}
                    </li>
                </ul>
            </div>
        </form>
       )
}
