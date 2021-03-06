import React, {useEffect, useState} from 'react';
import $ from 'jquery'
import "swiper/swiper-bundle.css";

export const MultiOption = ({defData, handleChoise, name, data, selected: pushSelected}) => {


    console.log("&&&&&&&&&&&&&&&" , defData)
    let defsel = '';
    if (defData) {
        data.map(items => {
            if (items.id == defData) {
                defsel = items.name;
            }
        })
    }

    console.log("................", defData, data, defsel)
    const [selectedO, setSelectedO] = useState({
        item: defData ? defsel : ''
    });
    useEffect(() => {
        var interValOption;
        $(".main-options-sel").mouseover(function () {
            var thisis = $(this);
            $(".main-options-sel .option-icon i").removeClass("active")
            $(".main-options-sel #content").removeClass("active")
            thisis.find(".option-icon i").addClass("active")
            thisis.find("#content").addClass("active")
        })
        $(".main-options-sel").mouseout(function () {
            var thisis = $(this);
            $(".main-options-sel .option-icon i").removeClass("active")
            $(".main-options-sel #content").removeClass("active")
            thisis.find(".option-icon i").removeClass("active")
            thisis.find("#content").removeClass("active")

        })


    }, [])

    const selectedOpt = (e, name, id) => {
        e.preventDefault();
        setSelectedO({
            item: name
        })
        if (pushSelected) {
            pushSelected(id)

        }

        $("li#content").removeClass("active");
        $(".input-searchsss").removeClass("active");
    }
    const delSel = (e, name) => {
        e.preventDefault();
        setSelectedO({
            item: ''
        })
        if (pushSelected) {
            pushSelected('')

        }
    }
    return (

        <ul className={"main-options-sel"}>
            <li id={"header-options"}>
                <div className={"option-icon"}>
                    <i className={"bx bx-chevron-down"}></i>
                </div>
                <span id={"selected"}>
                    {defData || selectedO.item !== "" ? (
                        <a onClick={e => delSel(e)}><i className='bx bx-x'></i><span
                            className={name}>{selectedO.item}</span></a>
                    ) : '???????????? ????????'}
                </span>
            </li>
            <li id={"content"} className={name}>
                <ul id={"main-child-sels"} className={name}>
                    {data ? data.map((item, index) => (
                        <li key={index} onClick={e => {
                            selectedOpt(e, item.name, item.id);
                            handleChoise(e, index, item.name, item.id)
                        }}>{item.name}</li>
                    )) : (<li disabled>?????????? ???????? ??????</li>)}

                </ul>
            </li>
        </ul>
    )
}
