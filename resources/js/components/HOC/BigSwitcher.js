import React , {useEffect} from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
export const BigSwitcher = ({name ,defaultStatus, valueOne ,valueTow ,valueThree , status:pushStatus }) => {


    useEffect(()=>{
        $("ul#bigest li").removeClass("act")
        $("li#"+defaultStatus).addClass("act")
        $("input#"+defaultStatus).prop("checked" , true)
    },[])

    $(function (){
        $("input[name="+name+"]").on("change" , function (){
            let content = $(this).attr("cont");
            pushStatus(content);
            let radioButtons = $("#myFormID input:radio[name="+name+"]")
            var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
            // console.log("filtereddddd :" , selectedIndex);
            $("ul#bigest li").removeClass("act");
            $("ul#bigest li").eq(selectedIndex).addClass("act");

        })



    })


    const handleBig = (type , name) => {
    //     console.log("radio : " , type , name)
    //     pushStatus(type);
    //     $("ul#bigest li").removeClass("act");
    //     $("input[name="+name).prop("checked" , true);
    //     $("li#"+type).addClass("act");
    }
    return (
        <form id={"myFormID"}>
            <div className={"switch-container"}>
                <ul id={"bigest"}>
                    <li id={"false"} className={"deactive"}>
                        <input onChange={handleBig("false" , name)} cont={"false"} type={"radio"} name={name}  />
                        {valueOne}</li>
                    <li id={"nf"} className={"active"}>
                        <input onChange={handleBig("nf" , name)} cont={"nf"} type={"radio"} name={name} />
                        {valueTow}
                    </li>
                    <li id={"nn"} className={"active"}>
                        <input onChange={handleBig("nn" , name)} cont={"nn"} type={"radio"} name={name} />
                        {valueThree}
                    </li>
                </ul>
            </div>
        </form>
       )
}
