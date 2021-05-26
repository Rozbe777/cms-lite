import React , {useContext,useEffect,useState} from 'react'
import {CHECK_BOX_CONTENT} from "./../Helper/Context";

const BottomNavigationBar = ({userData , deleteAll : pushDelete}) => {


    const {checkBox , setCheckBox} = useContext(CHECK_BOX_CONTENT)

    useEffect(()=>{

    } , [])

    const checkAll = e => {
        e.preventDefault();
        let dataAlls = [...checkBox];
        userData.data.map(item => {
            var index = dataAlls.indexOf(item.id);
            if (index == -1) {
                dataAlls.push(item.id);
            }
        })
        setCheckBox(dataAlls);
    }

    const unCheckAll = e => {
        e.preventDefault();
        let dataAlls = [];
        setCheckBox(dataAlls);
    }


    if(checkBox.length > 0){
        $(".bottom-tab-navigator").addClass("active")
        $("span.counter-seleced").addClass("active")
    }else{
        $(".bottom-tab-navigator").removeClass("active")
        $("span.counter-seleced").removeClass("active")
    }


    const handleDel = e => {
        e.preventDefault();
        pushDelete(e)
    }
    return (
        <div className={"bottom-tab-navigator"}>

                    <span className={"counter-seleced"}>
                           {checkBox.length}
                    </span>
            <ul>
                <li>
                </li>
                <li onClick={e => checkAll(e)}>
                    <span><i className={"bx bx-check-double"}></i></span>
                    همه
                </li>
                <li onClick={e => unCheckAll(e)}>
                    <span><i className={"bx bx-x"}></i></span>
                    لغو
                </li>
                {/*<li >*/}
                {/*    <span><i className={"bx bx-printer"}></i></span>*/}
                {/*    پرینت*/}
                {/*</li>*/}
                <li onClick={e => handleDel(e)}>
                    <span><i className={"bx bx-trash-alt"}></i></span>
                    حذف
                </li>
            </ul>
        </div>
    )
}

export default  BottomNavigationBar;
