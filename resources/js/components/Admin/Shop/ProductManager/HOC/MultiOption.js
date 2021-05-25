import React, {useEffect , useState} from 'react';
import $ from 'jquery'
import "swiper/swiper-bundle.css";

export const MultiOption = ({name , data , selected : pushSelected}) => {

    const [selectedO , setSelectedO] = useState({
        item : ''
    });
    useEffect(() => {
        var interValOption;
        $(".main-options-sel").mouseover(function () {
            var thisis = $(this);
            clearInterval(interValOption)
            interValOption = setInterval(() => {
                $(".main-options-sel .option-icon i").removeClass("active")
                $(".main-options-sel #content").removeClass("active")
                thisis.find(".option-icon i").addClass("active")
                thisis.find("#content").addClass("active")
            }, 300)
        })
        $(".main-options-sel").mouseout(function () {
            var thisis = $(this);
            clearInterval(interValOption)
            interValOption = setInterval(() => {
                $(".main-options-sel .option-icon i").removeClass("active")
                $(".main-options-sel #content").removeClass("active")
                thisis.find(".option-icon i").removeClass("active")
                thisis.find("#content").removeClass("active")
            }, 300)
        })
    }, [])

    const selectedOpt = (e , name) => {
        e.preventDefault();
        setSelectedO({
            item : name
        })
        pushSelected(name)
    }
    const delSel = (e , name) => {
        e.preventDefault();
        setSelectedO({
            item : ''
        })
        pushSelected('')
    }
    return (

        <ul className={"main-options-sel"}>
            <li id={"header-options"}>
                <div className={"option-icon"}>
                    <i className={"bx bx-chevron-down"}></i>
                </div>
                <span id={"selected"}>
                    {selectedO.item !== "" ? (
                        <a onClick={e =>delSel(e)}><i className='bx bx-x'></i><span>{selectedO.item}</span></a>
                        ) : 'انتخاب کنید'}
                </span>
            </li>
            <li id={"content"}>
                <ul>
                    {data.map(item => (
                        <li onClick={e => selectedOpt(e , item)}>{item}</li>
                    ))}

                </ul>
            </li>
        </ul>
    )
}
