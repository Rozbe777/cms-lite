import React , {useEffect , useState} from 'react';
import {Item} from './Item'
import $ from 'jquery';
export const TreeShowCategory = (props) => {

    useEffect(()=>{

    })

    $(function (){
        $("span#sub-menu-custom").click(function (){
            $(".back-blur").fadeIn(100);
            setTimeout(()=>{
                $("#bottom-chip").addClass("active");
            },200)
        })
        $(".back-blur").click(()=>{
            $("#bottom-chip").removeClass("active");
            setTimeout(()=>{
                $(".back-blur").fadeOut(100)
            },200)
        })
    })
    if(props.loading){
        return <p>در حال پردازش ...</p>
    }
    return (
        <ul className={"content-li"}>

            <li>
               <Item />
                <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                    <div className={"branch"}>
                        <div className={"box"}></div>
                    </div>

                    <li>
                        <Item />

                        <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                            <div className={"branch"}>
                                <div className={"box"}></div>
                            </div>

                            <li>
                                <Item />
                            </li>
                        </ul>
                    </li>

                </ul>

            </li>
        </ul>
    )

}
