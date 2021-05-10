import React , {useEffect} from 'react';
import "swiper/swiper-bundle.css";
// import './_Shared/styleAction.scss'

export const MultiOption = ({name}) => {


    useEffect(()=>{
        $("#box-droper").click(() => {
            let parentGet = $(this).parent(".optionss");

            parentGet.find(".optionBox#options").toggleClass("active");
            parentGet.find(".options i#droper").toggleClass("active");
        })
    },[])
    const handleDropDown = (e) => {
        e.preventDefault();
        // $(".show-chipset-multi i#droper").removeClass("active");
        // $(".optionBox").removeClass("active");
        $(".optionBox#options").toggleClass("active");
        $(".options i#droper").toggleClass("active");
        // console.log("click daaaaaa , " , e.currentTarget.getAttribute('data-appmode'))
    }





    return (
        <div className={"main-selected"} style={{background: '#fff'}}>
            <div className={"show-chipset-multi optionss"}>

                <div id={"box-droper"} attr-name={name} className={"options"}>
                    <i className={"bx bx-chevron-down"} id={"droper"}></i>
                </div>

                <span id={"sorting"}>انتخاب کنید</span>

                <div className={"optionBox"} id={"options"} style={{height: 'auto !important'}}>
                    <ul id={"options"}>
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
    )
}
