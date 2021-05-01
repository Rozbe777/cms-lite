import React from 'react';
import "swiper/swiper-bundle.css";
// import './_Shared/style.scss'

export const OneSelected = () => {

    const handleDropDown = (e) => {
        e.preventDefault();
        // $(".show-chipset-multi i#droper").removeClass("active");
        // $(".optionBox").removeClass("active");
        $(".optionBox#options").toggleClass("active");
        $(".options i#droper").toggleClass("active");
        // console.log("click daaaaaa , " , e.currentTarget.getAttribute('data-appmode'))
    }

    return (
        <>
            <p id={"form-creator-p"}>چند انتخابیییییی</p>
            <div className={"main-selected"} style={{background: '#fff',color : '#475F7B'}}>
                <div className={"show-chipset-multi optionss"}>

                    <div id={"box-droper"} className={"options formcreatordroper"} onClick={e => handleDropDown(e)}>
                        <i className={"bx bx-chevron-down"} id={"droper"}></i>
                    </div>

                    <span id={"sorting"} onClick={e => handleDropDown(e)}>انتخاب کنید</span>

                    <div className={"optionBox formcreator"} id={"options"}>
                        <ul id={"options"} onClick={e => handleDropDown(e)}>
                            <li>بر اساس تاریخ انتشار</li>
                            <li>بر اساس بیشترین قیمت</li>
                            <li>بر اساس موجود بودن</li>
                            <li>بر اساس ناموجود بودن</li>
                            <li>بر اساس با تخفیف</li>
                            <li>بر اساس بدون تخفیف</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
