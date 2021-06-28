import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
export const ItemCheckOutAll = (props) => {
    useEffect(() => {
    }, [])
    let tags = [
        "برچسپ یک",
        "برچسپ یک",
        "برچسپ یک",
        "برچسپ یک",
        "برچسپ یک",
        "برچسپ یک",
    ];
    // const {mini} = props;
    const [state, setState] = useState();
    return (
       <div className={"item-checkAll"}>
           <div className={"image"}>
               <img src={"/images/avatar.jpg"} />

               <span className={"count"}>255</span>
           </div>
           <div id={"titles"}>
               <p >ssssssssssssssssssssssssssssssssssssssssssss</p>

               <div id={"main"}>
               <Swiper
                   slidesPerView={4}
                   pagination={{clickable: true}}
                   scrollbar={{draggable: true}}
                   // onSlideChange={(e) => CheckWidth(e)}
               >
                   {tags ? tags.map((item , index) => (
                           <SwiperSlide key={index} virtualIndex={index}>
                               <span>{item}</span>
                           </SwiperSlide>
                       )
                   ) : ''}
               </Swiper>

               </div>

           </div>

           <span id={"price"}>
               125555555 تومان
           </span>

       </div>
    )
}

