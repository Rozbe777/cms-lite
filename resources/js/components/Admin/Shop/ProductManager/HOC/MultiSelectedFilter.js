import React, {useEffect, useState} from 'react';
import Loading from "../../../../Admin/_Micro/Loading";
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import './_shared/style.scss';


export const MultiSelectedFilter = ({dataRes , selected: pushSelected}) => {

    const [checkFilter, setCheckFilter] = useState([])
    const [data] = useState(dataRes)

    const HandleChange = (e, id) => {
        let checkBoxCustom = $("span.checkboxeds." + id);
        let checked = [...checkFilter]
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                value: e.target.value
            })
            setCheckFilter(checked)
            pushSelected(checked)
            // console.log("1111111 : " , check)
        } else {
            checkBoxCustom.removeClass("active")
            const results = checked.filter(obj => obj.id !== id);
            // var result = check.filter(obj => console.log("object name : " , parseInt(obj.id) , " / name : " , id));
            setCheckFilter(results)
            pushSelected(results)
        }

    }


    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#selectedFilter").toggleClass("active")
        $(".selectedddFilter i#droper").toggleClass("active");
        // console.log("click daaaaaa , " , e.currentTarget.getAttribute('data-appmode'))
    }

    const RemoveChipset = (id) => {
        $("span.checkboxeds." + id).removeClass("active");
        $("input[name=" + id + "]").prop("checked", false);
        var result = checkFilter.filter(obj => obj.id !== id);
        setCheckFilter(result)
        pushSelected(result)
    }
    return (
        <div className={"main-selected"}>
            <div className={"show-chipset-multi"}>
                {checkFilter.length > 0 ? (
                    <Swiper
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        scrollbar={{draggable: true}}
                    >
                        {checkFilter ? checkFilter.map((item , key) => (
                                <SwiperSlide key={key} virtualIndex={item.id}>
                                    <div key={key} className={"chip mr-1"} style={{background: '#1976d2', color: '#fff'}}>
                                        <div className={"chip-body"}>
                                        <span className={"chip-text"}
                                              style={{color: '#fff', marginTop: '-4px'}}>{item.value}</span>
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
            <div id={"box-droper"} className={"selectedddFilter"} onClick={e => handleDropDown(e)}>
                <i className={"bx bx-chevron-down"} id={"droper"}></i>
            </div>

            <div className={"optionBox"} id={"selectedFilter"}>
                <ul>
                    {data ? data.length > 0 ? data.map(item => (
                        <li>
                            <fieldset>
                                <span className={"checkboxeds " + item.id} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                                <input type="checkbox"
                                       onChange={e => HandleChange(e, item.id)}
                                       name={item.id}
                                       style={{background: 'green !important'}}
                                       value={item.value} id="checkbox1"/>
                                <span id={"labels"} htmlFor="checkbox1">{item.value}</span>
                            </fieldset>
                        </li>

                    )) : (<p>انتخاب کنید</p>) : (
                        <Loading/>
                    )}


                </ul>
            </div>

        </div>
    )
}
