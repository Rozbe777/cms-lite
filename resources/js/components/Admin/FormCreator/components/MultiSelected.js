import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import '../HOC/_Shared/style.scss';


export const MultiSelected = ({selected: pushSelected}) => {

    const [check, setCheck] = useState([])
    const [data, setData] = useState([
        {
            id: 1,
            name: 'دسته بندی اول'
        }, {
            id: 2,
            name: 'دسته بندی دوم'
        }, , {
            id: 3,
            name: 'دسته بندی سوم'
        },
    ])
    const [paginateThumbs, setPaginateThumbs] = useState();
    const [load, setLoad] = useState(false);
    let selectCheckBox = new Set();
    useEffect(() => {
    }, [])


    const HandleChange = (e, id) => {

        let checkBoxCustom = $("span.checkboxeds." + id);
        let checked = [...check]
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            checked.push({
                id: e.target.name,
                name: e.target.value
            })
            setCheck(checked)
            pushSelected(checked)
            // console.log("1111111 : " , check)
        } else {
            checkBoxCustom.removeClass("active")
            const results = check.filter(obj => parseInt(obj.id) !== id);
            // var result = check.filter(obj => console.log("object name : " , parseInt(obj.id) , " / name : " , id));
            setCheck(results)
            pushSelected(results)
        }

    }


    const handleDropDown = (e) => {
        e.preventDefault();
        $(".optionBox#selected").toggleClass("active")
        $(".selecteddd i#droper").toggleClass("active");
        // console.log("click daaaaaa , " , e.currentTarget.getAttribute('data-appmode'))
    }

    const RemoveChipset = (id) => {
        $("span.checkboxeds." + id).removeClass("active");
        $("input[name=" + id + "]").prop("checked", false);
        var result = check.filter(obj => obj.id !== id);
        setCheck(result)
        pushSelected(result)
    }
    return (
        <>
            <p id={"form-creator-p"}>چند انتخابیییییی</p>
            <div className={"main-selected"} style={{color : '#475F7B'}}>

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
            <div id={"box-droper"} className={"selecteddd formcreatordroper"} onClick={e => handleDropDown(e)}>
                <i className={"bx bx-chevron-down"} id={"droper"}></i>
            </div>

            <div className={"optionBox formcreator"} id={"selected"}>
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
                                       value={item.name} id="checkbox1"/>
                                <span id={"labels"} htmlFor="checkbox1">{item.name}</span>
                            </fieldset>


                        </li>

                    )) : (<p>انتخاب کنید</p>) : (
                        <p>fff</p>
                    )}


                </ul>
            </div>

        </div>
            <p>
                <small className="text-muted">لورم ایپسوم متن ساختگی برای چند انتخابی است ...</small>
            </p>
        </>

    )
}
