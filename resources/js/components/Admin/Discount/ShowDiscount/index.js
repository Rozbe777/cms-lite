import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import {AddDiscount} from './../AddDiscount';
import {ItemDis} from "../layout/ItemDis";
import $ from "jquery";
import ReactDom from "react-dom";

const Show = (props) => {
    let targetElem = document.getElementById("add-datas");

    useEffect(() => {
        $("#breadCrumb").addClass("activeCrumb");
    }, [])
    const {token} = props;
    console.log(props , "propsss")
    const [state, setState] = useState();
    const [checkBox, setCheckBox] = useState([]);


    const [breadData] = useState({
        title: 'کد تخفیف',
        desc: 'نمایش لیست کد های تخفیف و مدیریت آنها'
    });


    $(function () {
        $("ul#menueeee li").mouseover(function () {
            $(this).find("ul").addClass("active");
        })
        $("ul#menueeee li").mouseout(function () {
            $(this).find("ul").removeClass("active");
        })
    })

    const handleBack = (item) => {
        if (item.status == 200) {
            // get();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const handleAddDisc = e => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount token={token} result={handleBack(e)}/>, document.getElementById("add-datas"));
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

                <div className={"row"} style={{padding : '15px'}}>
                    <div className={"col-lg-3 col-md-4 col-sm-6"} style={{padding : '5px'}}>
                        <ItemDis />
                    </div>
                </div>

            </div>

            <div id={"add-datas"}></div>
        </>
    )
}

export default Show;

let elem = document.getElementById("discount-page");
if (elem) {
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Show {...props} />, elem)
}
