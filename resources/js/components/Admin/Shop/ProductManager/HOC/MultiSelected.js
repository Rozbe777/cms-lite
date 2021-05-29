import React, {useEffect, useState} from 'react';
import {Request} from "../../../../../services/AdminService/Api";
import Loading from "../../../../Admin/_Micro/Loading";
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import './_shared/style.scss';
import $ from "jquery";


export const MultiSelected = ({data, selected: pushSelected}) => {

    const [check, setCheck] = useState([])
    // const [data, setData] = useState()
    const [paginateThumbs, setPaginateThumbs] = useState();
    const [load, setLoad] = useState(false);
    let selectCheckBox = new Set();
    useEffect(() => {
        var interValOptions;
        $(".main-selected").mouseover(function () {
            clearInterval(interValOptions)
            var thisis = $(this);
            interValOptions = setInterval(() => {
                thisis.find(".optionBox").addClass("active")
                thisis.find("#box-droper").html('');
                thisis.find("#box-droper").append('<i class="bx bx-chevron-up"></i>');
            }, 300)
        })
        $(".main-selected").mouseout(function () {
            clearInterval(interValOptions)
            var thisis = $(this);
            interValOptions = setInterval(() => {
                thisis.find(".optionBox").removeClass("active")
                thisis.find("#box-droper").html('');
                thisis.find("#box-droper").append('<i class="bx bx-chevron-down"></i>');
            }, 300)
        })
    }, [])
    const HandleChange = (e, id) => {
        let checkBoxCustom = $("span.checkboxeds." + id);
        let checked = [...check];
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                name: e.target.value
            })
            setCheck(checked)
            pushSelected(checked)
        } else {
            checkBoxCustom.removeClass("active")
            const results = check.filter(obj => {
                if (typeof id === 'string') {
                    return obj.id !== id;
                } else {
                    return parseInt(obj.id) !== id;
                }
            });
            setCheck(results)
            pushSelected(results)
        }

    }


    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#selected").toggleClass("active")
        var icoon = $(".selecteddd i").attr("class");
        if (icoon === "bx-chevron-down") {
            $(".selecteddd").html('');
            $(".selecteddd").append('bx-chevron-up');

        } else {
            $(".selecteddd").html('');
            $(".selecteddd").append('bx-chevron-down');
        }
        // $(".selecteddd").toggleClass("active");
        // console.log("click daaaaaa , " , e.currentTarget.getAttribute('data-appmode'))
    }

    const RemoveChipset = (id) => {
        $("span.checkboxeds." + id).removeClass("active");
        $("input[name=" + id + "]").prop("checked", false);
        var result = check.filter(obj => obj.id !== id);
        setCheck(result)
        pushSelected(result)
    }

    console.log("dataa....a : ", data)
    return (
        <div className={"main-selected"}>
            <div className={"show-chipset-multi"}>
                {check.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                        // onSlideChange={(e) => CheckWidth(e)}
                        // onSwiper={(swiper) => console.log(swiper)}
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
            <div id={"box-droper"} className={"selecteddd"} onClick={e => handleDropDown(e)}>
                <i className={"bx bx-chevron-down"}></i>
            </div>

            <div className={"optionBox"} id={"selected"}>
                <ul>
                    {data ? data.map(item => (
                        <li>
                            <fieldset>
                                <span className={"checkboxeds " + item.id} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                                <input type="checkbox"
                                       onChange={e => HandleChange(e, item.id)}
                                       name={item.id}
                                       style={{background: 'green !important'}}
                                       value={item.name} id="checkbox1"/>
                                <span id={"labels"} htmlFor="checkbox1">{item.name}</span>
                            </fieldset>

                            {item.childern ? item.childern.length > 0 ? (
                                <ul style={{padding: '10px 10px 0 0'}}>
                                    {item.childern.map(child2 => (
                                        <li>
                                            <fieldset>
                                                <span style={{float: 'right'}}>></span>
                                                <span className={"checkboxeds " + child2.id} id={"child2"}
                                                      style={{color: '#fff'}}>
                                                   <i className={"bx bx-check"}></i>
                                               </span>
                                                <input type="checkbox"
                                                       style={{float: 'right'}}
                                                       onChange={e => HandleChange(e, child2.id)}
                                                       name={child2.id}
                                                       value={child2.name} id="checkbox1"/>
                                                <span id={"labels"} htmlFor="checkbox1">{child2.name}</span>
                                            </fieldset>

                                            {child2.children.length > 0 ? (
                                                <ul style={{padding: '5px 10px 0 0'}}>
                                                    {child2.children.map(child3 => (
                                                        <li>
                                                            <fieldset>
                                                                <span style={{float: 'right'}}>>></span>

                                                                <span className={"checkboxeds " + child3.id}
                                                                      id={"child3"} style={{color: '#fff'}}>
                                                                    <i className={"bx bx-check"}></i>
                                                                </span>

                                                                <input type="checkbox"
                                                                       onChange={e => HandleChange(e, child3.id)}
                                                                       name={child3.id}
                                                                       style={{marginRight: '5px', width: '90px'}}
                                                                       value={child3.name} id="checkbox1"/>
                                                                <span id={"labels"}
                                                                      htmlFor="checkbox1">{child3.name}</span>
                                                            </fieldset>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : ''}
                                        </li>
                                    ))}
                                </ul>
                            ) : '' : ''}


                        </li>

                    )) : (
                        <Loading/>
                    )}


                </ul>
            </div>

        </div>
    )
}
