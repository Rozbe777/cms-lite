import React, {useEffect, useState} from 'react';
import Loading from "../../../../Admin/_Micro/Loading";
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import './_Shared/style.scss';


export const MultiSelectedFilterSwitcher = ({lett , dataRes, selected: pushSelected}) => {

    const [checkFilter, setCheckFilter] = useState([])
    const [data] = useState(dataRes)

    useEffect(()=>{
        if (lett){
            document.querySelector(".optionBox").classList.add("float_on");
        }else{
            document.querySelector(".optionBox").classList.remove("float_on");
        }

    } , [])

    const HandleChange = (e, id, value) => {

        let checkBoxCustom = $("span.checkboxeds." + id);
        let checked = [...checkFilter]
        if (e.target.checked) {
            $("input[name="+id+"]").prop("checked" , true);
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                value: value
            })
            setCheckFilter(checked)
            pushSelected(checked)
        } else {
            $("input[name="+id+"]").prop("checked" , false);
            checkBoxCustom.removeClass("active")
            const results = checked.filter(obj => obj.id !== id);
            setCheckFilter(results)
            pushSelected(results)
        }

    }


    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#selectedFilter").toggleClass("active")
        $(".selectedddFilter i#droper").toggleClass("active");
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
                        {checkFilter ? checkFilter.map((item, key) => (
                                <SwiperSlide key={key} virtualIndex={item.id}>
                                    <div className={"chip mr-1"} style={{background: '#1976d2', color: '#fff'}}>
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
                    <p onClick={e => handleDropDown(e)}>???????????? ????????</p>
                )}

            </div>
            <div id={"box-droper"} className={"selectedddFilter"} onClick={e => handleDropDown(e)}>
                <i className={"bx bx-chevron-down"} id={"droper"}></i>
            </div>

            <div className={"optionBox"} id={"selectedFilter"}>
                <ul>
                    {data ? data.length > 0 ? data.map((item , index) => (
                        <li key={index}>

                            <div style={{float: 'right'}}
                                 className="custom-control custom-switch custom-switch-success custom-control-inline mb-1">
                                <input name={item.name} type="checkbox" className="custom-control-input"
                                       onChange={e => HandleChange(e, item.name, item.value)} id={item.name}/>
                                <label style={{marginLeft: 10}} className="custom-control-label"
                                       htmlFor={item.name}>
                                    <span className="switch-icon-left"><i className="bx bx-check"></i></span>
                                    <span className="switch-icon-right"><i className="bx bx-x"></i></span>
                                </label>
                                <span>{item.value}</span>
                            </div>

                        </li>

                    )) : (<p>???????????? ????????</p>) : (
                        <Loading/>
                    )}


                </ul>
            </div>

        </div>
    )
}
