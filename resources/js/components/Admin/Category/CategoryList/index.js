import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Shared/java'
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import $ from 'jquery';

export const CategoryList = () => {
    const [dispaly, setDisplay] = useState(false)
    const [dispalyAdd, setDisplayAdd] = useState(true)
    useEffect(() => {

    })

    $(function () {
        $("#add-category").click(() => {
            setDisplay(true)
        })
    })


    const handleAdding = (e) => {
        $(".back-loader").fadeOut();
        setTimeout(() => {
            $("#category_add_pop_base").fadeIn();
        }, 200)
    }


    const handleAddPage = () => {
        $("#category_add_pop_base").fadeIn();
    }


    return (
        <div>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nav-item col-6 nav-custom">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" aria-controls="home"
                       role="tab" aria-selected="true">
                        <i className="bx bxs-categories align-middle"
                           style={{marginTop: '4px', fontSize: '35px !important'}}></i>
                        <span className="align-middle">دسته بندی</span>
                    </a>
                </li>
                <li className="nav-item col-6 nav-custom">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" aria-controls="profile"
                       role="tab" aria-selected="false">
                        <i className="bx bxs-layer align-middle"
                           style={{marginTop: '4px', fontSize: '35px !important'}}></i>
                        <span className="align-middle">صفحات داخلی</span>
                    </a>
                </li>

            </ul>

            <div className="tab-content" style={{padding: 0}}>
                <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">

                    <TreeShowCategory props={"data"}/>

                </div>
                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">
                    <p style={{textAlign : 'center' , marginTop : 20}}>
                        صفحه ای برای نمایش وجود ندارد!
                    </p>

                    <div id={"maines"}>
                        <button id="add-category"
                                onClick={() => handleAddPage()}
                                style={{width : 180}}
                                className="btn btn-primary glow mr-1 mb-1"
                                type="button">
                            <span className="align-middle ml-25">ساخت صفحه جدید</span>
                        </button>
                    </div>


                </div>

            </div>


            <BackLoader/>



        </div>

    )
}

let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
