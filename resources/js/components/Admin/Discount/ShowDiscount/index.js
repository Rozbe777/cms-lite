import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import {AddDiscount} from './../AddDiscount';
import $ from "jquery";

const Show = (props) => {
    let targetElem = document.getElementById("add-datas");

    useEffect(() => {
        $("#breadCrumb").addClass("activeCrumb");
    }, [])
    const {mini} = props;
    const [state, setState] = useState();
    const [checkBox, setCheckBox] = useState([]);


    const [breadData] = useState({
        title: 'کد تخفیف',
        desc: 'نمایش لیست کد های تخفیف و مدیریت آنها'
    });


    $(function (){
        $("ul#menueeee li").mouseover(function(){
            $(this).find("ul").addClass("active");
        })
        $("ul#menueeee li").mouseout(function(){
            $(this).find("ul").removeClass("active");
        })
    })


    const handleAddDisc = e => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount  /> , document.getElementById("add-datas") );
    }


    return (
        <>
            <div className={"row col-12"} id={"headerContent"}>
                {/*<TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}*/}
                {/*              allData={contentData.data ? contentData : []} data={checkBox}/>*/}
                <BreadCrumbs titleBtn={"ساخت کد تخفیف"} icon={"bx bx-plus"} data={breadData}
                             clicked={e => handleAddDisc(e)}/>
            </div>

            <div className={"container-fluid"}>
<ul id={"menueeee"}>
    <li>
        <span>منو یک</span>
        <ul>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
        </ul>
    </li>

    <li>
        <span>menu22</span>
        <ul>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
            <li>منو یک</li>
        </ul>
    </li>
</ul>
            </div>
            <div id={"add-datas"}></div>
        </>
    )
}

export default Show;

let elem = document.getElementById("discount-page");
if (elem) {
    ReactDOM.render(<Show/>, elem)
}
