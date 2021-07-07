import React, {useContext, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import $ from "jquery";
import {Searchs} from "./Context";

export const MultiSelectedUser = ({
                                        handleSelecete,
                                        searchs,
                                        loadings,
                                        defSelected,
                                        clear,
                                        name,
                                        clearNew: pushClear,
                                        data,
                                        selected: pushSelected,
                                        check: pushIdCheck,
                                        me: setMe
                                    }) => {


    const [check, setCheck] = useState([])
    const [load, setLoad] = useState(false);
    let selectCheckBox = new Set();
    let interValOptionsss = 0;

    useEffect(() => {

        $(".main-selected").mouseover(function () {
            var thisisss = $(this);
            clearInterval(interValOptionsss)
            thisisss.find(".optionBox").addClass("active")
            thisisss.find("#box-droper i").addClass("active");

        })
        $(".main-selected").mouseout(function () {
            var thisisss = $(this);
            clearInterval(interValOptionsss)
            thisisss.find(".optionBox").removeClass("active")
            thisisss.find("#box-droper i").removeClass("active");
        })


        let checkkks = [...check];
        if (defSelected) {
            defSelected.map(item => {
                checkkks.push({
                    id: item.id,
                    name: item.name ? item.name : item.title
                })
                setCheck(checkkks)
            })
        }

        let checkdddd = [...check];
        if (clear) {
            checkdddd = [];
            setCheck(checkdddd);
            pushClear(false);
        }

    }, [])

    const handleSearchs = e => {
        e.preventDefault();
        searchs(e.target.value);
    }
    const HandleChange = (e, id) => {

        let checkBoxCustom = $("span." + name + ".checkboxeds." + id);
        let checked = [...check];
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                name: e.target.value
            })


            setCheck(checked)

            handleSelecete(checked)


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
            handleSelecete(results)


        }

    }


    const RemoveChipset = (id) => {
        $("span." + name + ".checkboxeds." + id).removeClass("active");
        $("input[name=" + id + "]").prop("checked", false);
        var result = check.filter(obj => obj.id !== id);
        setCheck(result)
        handleSelecete(result)


    }


    $(function () {
        check.map(item => {
            $("input[name=" + item.id + "]").prop("checked", true);
            $("span.checkboxeds." + item.id + "." + name).addClass("active");
        })


    })

    const closeSearch = e => {
        e.preventDefault();

        $(".input-searchsss").removeClass("active")
        $(".main-selected .optionBox").removeClass("active")
        $(".main-selected #box-droper i").removeClass("active");
    }


    return (
        <div className={"main-selected"}>

            <div className={"input-searchsss"}>
                <i className={"bx bx-x"} id={"close"} onClick={e => closeSearch(e)}></i>
                <input type={"type"} onChange={e => handleSearchs(e)} placeholder={"برای جستجو تایپ کنید"}/>
            </div>

            <div className={"show-chipset-multi"} id={name}>
                {check.length > 0 ? (
                    <Swiper
                        slidesPerView={2}
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                    >
                        {check ? check.map((item, index) => (
                                <SwiperSlide key={index} virtualIndex={item.id}>
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
                    <p>انتخاب کنید</p>
                )}

            </div>
            <div id={"box-droper"} className={"selecteddd"}>
                <i className={"bx bx-chevron-down"}></i>
            </div>

            <div className={"optionBox float_on"} id={"selected"}>
                <ul id={name}>
                    {loadings ? (<div style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        width: '100%',
                        height: '70px'
                    }}>
                        <div className="spinner-border text-primary"
                             role="status">
                            <span className="sr-only">در حال بارگذاری ...</span>
                        </div>
                    </div>) : data ? data.length > 0 ? data.map((item, index) => (
                        <li key={index}>
                            <fieldset>
                                <span className={"checkboxeds " + item.id + " " + name} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                                <input type="checkbox"
                                       onChange={e => HandleChange(e, item.id)}
                                       name={item.id}
                                       style={{background: 'green !important'}}
                                       value={item.name ? item.name : item.title ? item.title : ''} id="checkbox1"/>
                                <span id={"labels"}
                                      htmlFor="checkbox1">{item.name ? item.name : item.title ? item.title : ''}</span>
                            </fieldset>


                        </li>

                    )) : (
                        "موردی برای انتخاب وجود ندارد"
                    ) : 'موردی برای انتخاب وجود ندارد'}


                </ul>
            </div>

        </div>
    )
}
