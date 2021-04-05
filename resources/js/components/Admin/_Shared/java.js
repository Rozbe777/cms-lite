import React, {Component} from 'react';
import $ from 'jquery';
export const Java = () =>  {

    $("#checkAll").change(function (){
        $(".checkItem").prop("checked" , $(this).prop("checked"));

    })

    $(".checkItem").change(function (){
        if($(this).prop("checked") == "false")
        {
            $("#checkAll").prop("checked" , false);
        }
        if($(".checkItem:checked").length == $(".checkItem").length){
            $("#checkAll").prop("checked" , true)
        }
    })

        return (
            <div>
                <div className={"checkbox"}>
                    <label>
                        <input type={"checkbox"} id={"checkAll"}/>
                    </label>
                </div>
                <div className={"row"}>
                    <div className={"checkbox"}>
                        <label>
                            <input type={"checkbox"} className={"checkItem"}/>
                        </label>
                    </div>
                </div>

            </div>
        );

}

