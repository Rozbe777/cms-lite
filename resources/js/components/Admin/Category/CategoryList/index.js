import React, {useState, useEffect} from 'react'
import ReactDom from 'react-dom';
import {PopUpCreate} from './../../_Shared/java'
import $ from 'jquery';

export const CategoryList = () => {
    const [dispaly, setDisplay] = useState(false)
    useEffect(() => {

    })

    $(function () {
        $("#add-category").click(() => {
            setDisplay(true)
        })
    })
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
                    <ul className={"content-li"}>
                        <li>
                            <div id={"li-div"}>
                                <div className={"row"} style={{padding: '0 20px'}}>
                                    <div className={"col-md-6"} style={{padding: 13}}>
                                        <div className={"form-check"}>
                                            <input type="checkbox"
                                                   id={"checkAll"}
                                                   className="form-check-input check-category"/>
                                            <label className="form-check-label"></label>
                                            <span> تست دسته بندی</span>

                                        </div>
                                    </div>

                                    <div className={"col-md-6"} style={{padding: 13}}>
                                        <div className={"form-check"}>

                                            <i className={"bx bx-plus"}></i>
                                            <i className={"bx bx-show"}></i>
                                            <i className={"bx bx-trash-alt"}></i>
                                            <i className={"bx bx-edit"}></i>
                                            <i className={"bx bx-duplicate"}></i>

                                            <span className={"badge badge-success badge-pill ml-50"}>فعال</span>


                                        </div>
                                    </div>

                                </div>

                            </div>

                            <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                                <div className={"branch"}>
                                    <div className={"box"}></div>
                                </div>

                                <li>
                                    <div id={"li-div"}>

                                        <div className={"row"} style={{padding: '0 20px'}}>
                                            <div className={"col-md-6"} style={{padding: 13}}>
                                                <div className={"form-check"}>
                                                    <input type="checkbox"
                                                           id={"checkAll"}
                                                           className="form-check-input check-category"/>
                                                    <label className="form-check-label"></label>
                                                    <span> تست دسته بندی</span>

                                                </div>
                                            </div>

                                            <div className={"col-md-6"} style={{padding: 13}}>
                                                <div className={"form-check"}>

                                                    <i className={"bx bx-plus"}></i>
                                                    <i className={"bx bx-show"}></i>
                                                    <i className={"bx bx-trash-alt"}></i>
                                                    <i className={"bx bx-edit"}></i>
                                                    <i className={"bx bx-duplicate"}></i>
                                                    <span className={"badge badge-success badge-pill ml-50"}>فعال</span>


                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                    <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                                        <div className={"branch"}>
                                            <div className={"box"}></div>
                                        </div>

                                        <li>
                                            <div id={"li-div"}>

                                                <div className={"row"} style={{padding: '0 20px'}}>
                                                    <div className={"col-md-6"} style={{padding: 13}}>
                                                        <div className={"form-check"}>
                                                            <input type="checkbox"
                                                                   id={"checkAll"}
                                                                   className="form-check-input check-category"/>
                                                            <label className="form-check-label"></label>
                                                            <span> تست دسته بندی</span>

                                                        </div>
                                                    </div>

                                                    <div className={"col-md-6"} style={{padding: 13}}>
                                                        <div className={"form-check"}>

                                                            <i className={"bx bx-plus"}></i>
                                                            <i className={"bx bx-show"}></i>
                                                            <i className={"bx bx-trash-alt"}></i>
                                                            <i className={"bx bx-edit"}></i>
                                                            <i className={"bx bx-duplicate"}></i>

                                                            <span
                                                                className={"badge badge-success badge-pill ml-50"}>فعال</span>


                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </li>


                    </ul>
                </div>
                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                        مورد نیاز و کاربردهای متنوع با هدف
                    </p>
                </div>

            </div>


            <div className={"back-loader"}>
                <div className={"box-selected"}>
                    <ul>
                        <li id={"first"}>لطفا نوع صفحه را انتخاب کنید</li>
                        <li>
                            <div id={"icon"}>
                                <i className={"bx bxs-categories align-middle"}></i>
                            </div>
                            <div id={"desc"}>
                                <p id={"first"} style={{marginTop : '5px !important'}}>دسته بندی</p>
                                <p id={"last"} style={{marginTop : '-10px !important'}}>صفحه ای که مجموعه ای از محصولات را نشان میدهد.</p>
                            </div>
                        </li>

                        <li>
                            <div id={"icon"}>
                                <i className={"bx bxs-categories align-middle"}></i>
                            </div>
                            <div id={"desc"}>
                                <p id={"first"} style={{marginTop : '5px !important'}}>دسته بندی</p>
                                <p id={"last"} style={{marginTop : '-10px !important'}}>صفحه ای که مجموعه ای از محصولات را نشان میدهد.</p>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>


        </div>
    )
}

let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
