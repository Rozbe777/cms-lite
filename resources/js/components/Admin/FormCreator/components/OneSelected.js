import React from 'react';
import "swiper/swiper-bundle.css";
import ReactDOM from "react-dom";
import {OneSelectedSetting} from './Setting/OneSelectedSetting'
import $ from "jquery";
import {ONE_OPTION_DATA} from "./Constant";
// import './_Shared/style.scss'

export const OneSelected = ({data}) => {


    console.log("//////////////////////" , data[0])

    const setting_main_content = document.getElementById("setting_main_content");

    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#options").toggleClass("active");
        $(".options i#droper").toggleClass("active");
    }

    const HandleClick = e => {
        e.preventDefault();
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
        ReactDOM.render(<OneSelectedSetting defaultData={data}  />, setting_main_content);
    }

    // localStorage.setItem(ONE_OPTION_DATA , data);

    return (
        <div onClick={e => HandleClick(e)}>
            <p id={"form-creator-p"}>چند انتخابیییییی</p>
            <div className={"main-selected"} style={{background: '#fff',color : '#475F7B'}}>
                <div className={"show-chipset-multi optionss"}>
                    <div id={"box-droper"} className={"options formcreatordroper"} onClick={e => handleDropDown(e)}>
                        <i className={"bx bx-chevron-down"} id={"droper"}></i>
                    </div>
                    <span id={"sorting"} onClick={e => handleDropDown(e)}>انتخاب کنید</span>
                    {/*{console.log("ccccccc : " , data.Options)}*/}
                    <div className={"optionBox formcreator"} id={"options"}>
                        <ul id={"options"} onClick={e => handleDropDown(e)}>
                            {data[0] ? data[0].Options.map(item => (
                                <li>{item}</li>
                            )):(
                                <li>لطفا گزینه برای انتخاب اضافه کنید!</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
