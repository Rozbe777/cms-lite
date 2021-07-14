import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
// import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import {DEFAULT_ICON} from "../../../services/Type";
import {separate} from "../../../helper";

export const ItemCheckOutAll = (props) => {
    console.log("____" , props)
    useEffect(() => {
    }, [])
    return (
        <div className={"item-checkAll"}>
            <div className={"image"}>
                {_renderImg()}
                <span className={"count"}>{props.count}</span>
            </div>
            <div id={"titles"}>
                <p>{props.title}</p>

            {/*    this place for show tags swiper*/}

            </div>

            <span id={"price"}>
                {_renderPrice(props.final_price)}
           </span>

        </div>
    )

    function _renderPrice(){

        let typePrice = " تومان ";
        return separate(props.final_price)+typePrice;
    }
    function _renderImg() {
        if (props.image_url) {
            return (
                <img src={props.image_url} style={{opacity : 1}}/>
            )
        } else {
            return (
                <img src={DEFAULT_ICON}/>
            )
        }

    }



}


// {/*<div id={"main"}>*/}
// {/*<Swiper*/}
// {/*    slidesPerView={4}*/}
// {/*    pagination={{clickable: true}}*/}
// {/*    scrollbar={{draggable: true}}*/}
// {/*    // onSlideChange={(e) => CheckWidth(e)}*/}
// {/*>*/}
// {/*    {tags ? tags.map((item , index) => (*/}
// {/*            <SwiperSlide key={index} virtualIndex={index}>*/}
// {/*                <span>{item}</span>*/}
// {/*            </SwiperSlide>*/}
// {/*        )*/}
// {/*    ) : ''}*/}
// {/*</Swiper>*/}
//
// {/*</div>*/}



