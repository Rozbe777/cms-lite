import React, {useContext, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import '../HOC/_Shared/style.scss';
import {FormContextMultiSelected, FormTheme} from "../Helper/Context";
import ReactDOM from "react-dom";
import $ from "jquery";
import {MultiSelectedSetting} from "./Setting/MultiSelectedSetting";
export const MultiSelected = ({selected: pushSelected}) => {
    const [check, setCheck] = useState([])
    const {initialFormDataMultiSel, setInitialFormDataMultiSel} = useContext(FormContextMultiSelected)
    const {formTheme} = useContext(FormTheme);
    useEffect(() => {
    }, [])
    const HandleChange = (e, id) => {
        let checkBoxCustom = $("span.checkboxeds." + id);
        let checked = [...check]
        console.log("e.target : " , e.target.checked , " / customs : " , checkBoxCustom , " id : " , id , " checked : " , checked)
        let checkTarget = e.target.checked;
        console.log(checkTarget);

        if (checkTarget) {
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                name: e.target.value
            })
            setCheck(checked)
        } else {
            console.log("un checked");
            checkBoxCustom.removeClass("active")
            const results = check.filter(obj => parseInt(obj.id) !== id);
            setCheck(results)
        }

    }


    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#selected").toggleClass("active")
        $(".selecteddd i#droper").toggleClass("active");
    }

    const RemoveChipset = (id) => {
        $("span.checkboxeds." + id).removeClass("active");
        $("input[name=" + id + "]").prop("checked", false);
        var result = check.filter(obj => obj.id !== id);
        setCheck(result)
    }

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextMultiSelected.Provider value={{
            initialFormDataMultiSel,
            setInitialFormDataMultiSel
        }}><MultiSelectedSetting/></FormContextMultiSelected.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");

    }
    let tags = initialFormDataMultiSel.Mandatory ? initialFormDataMultiSel.title ? initialFormDataMultiSel.title +  "(*)" : 'عنوان (*)' :  initialFormDataMultiSel.title ?  initialFormDataMultiSel.title : 'عنوان';


    return (
        <div onClick={e => HandleClick(e)}>
            <p id={"form-creator-p"} style={{color : formTheme.textColor}}>{tags}</p>
            <div className={"main-selected"} style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}>

            <div className={"show-chipset-multi"}>
                {check.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                    >
                        {check ? check.map(item => (
                                <SwiperSlide key={item.id} virtualIndex={item.id}>
                                    <div className={"chip mr-1"} style={{background: '#1976d2', color: '#fff'}}>
                                        <div className={"chip-body"}>
                                        <span className={"chip-text"}
                                              style={{color: '#fff', marginTop: '-4px'}}>{item.name}</span>
                                            <div className={"chip-closeable"} onClick={e => RemoveChipset(item.id)}
                                                 style={{background: "#0d47a1"}}>
                                                <i className={"bx bx-x"} id={"chipset-close"}></i>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        ) : ''}
                    </Swiper>
                ) : (
                    <p onClick={e => handleDropDown(e)}>انتخاب کنید</p>
                )}

            </div>
            <div id={"box-droper"} className={"selecteddd formcreatordroper"} onClick={e => handleDropDown(e)}>
                <i className={"bx bx-chevron-down"} id={"droper"} style={{color : formTheme.placeholderColor}}></i>
            </div>

            <div className={"optionBox formcreator"} id={"selected"}>
                <ul>
                    {initialFormDataMultiSel.Options ? initialFormDataMultiSel.Options.length > 0 ? initialFormDataMultiSel.Options.map((index , key) =>
                        (
                        <li>
                            <fieldset>
                                <span className={"checkboxeds " + key} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                                <input type="checkbox"
                                       onChange={e => HandleChange(e, key)}
                                       name={key}
                                       style={{background: 'green !important'}}
                                       value={index} id="checkbox1"/>
                                <span id={"labels"} htmlFor="checkbox1">{index}</span>
                            </fieldset>


                        </li>

                    )) : (<p>انتخاب کنید</p>) : (
                        <p>wait</p>
                    )}


                </ul>
            </div>

        </div>

        </div>

    )
}
