import React, {useEffect} from 'react';
import $ from 'jquery'
import "swiper/swiper-bundle.css";

export const MultiOption = ({name}) => {


    useEffect(() => {
        $(".main-options-sel").mouseover(function (){
            var thisis = $(this);
            thisis.find(".option-icon i").addClass("active")
        })
        $(".main-options-sel").mouseout(function (){
            var thisis = $(this);
            thisis.find(".option-icon i").removeClass("active")

        })
    }, [])





    return (

        <ul className={"main-options-sel"}>
            <li id={"header-options"}>
                <div className={"option-icon"}>
                    <i className={"bx bx-chevron-down"}></i>
                </div>
                <span id={"selected"}>
cccccccccccccccccsddddddddsddddddddddddddddddddddd
                </span>
            </li>
            <li>

            </li>
        </ul>

        // <fieldset className={"form-group"}>
        //
        // </fieldset>
    )
}
