import React, {useEffect, useState} from "react";
import {MultiOption} from "./../../Shop/ProductManager/HOC/MultiOption";
import $ from 'jquery';

const SearchComponent = ({category: pushCategory}) => {

    const [size, setSize] = useState(0);
    const [sizeCategory, setSizeCategory] = useState(0);
    useEffect(() => {

    })

    const handleSelected = (select) => {
        console.log("ssss ", select)
        setSize(select.length)
    }

    const handleCategory = (item) => {
        console.log("++++", item)
        pushCategory(item);
        setSizeCategory(item.length)
    }

    const handleFade = (e) => {
        $(".filter-content-fix").removeClass("active")
        setTimeout(() => {
            $(".filter-search").removeClass("active");
        }, 100);
    }

    const handleFadeSearchInput = (e) => {
        $(".search-input-float").toggleClass("active");
    }


    // jquery code in responsive
    const HandleResponsiveAdd = (e) => {
        e.preventDefault();
    }

    const handleFadeSearch = (e) => {
        e.preventDefault();
        $(".filter-search").addClass("active");
        setTimeout(() => {
            $(".filter-content-fix").addClass("active")
        }, 100);
    }


    return (
        <>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>
                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className={"container-fluid"}>

                        <div className="row col-12" id={"header-card-custom"}>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <label htmlFor="users-list-verified">جستجو</label>
                                <input type="text" className="form-control"
                                       id={"search_input"}
                                       placeholder="جستجو با ایمیل و تلفن ..." name="search"/>

                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-verified">تایید شده</label>
                                <MultiOption name={"acceeptable"} data={["تایید نشده", "تایید شده"]}
                                             selected={item => console.log("checkeddddd : ", item)}/>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <label htmlFor="users-list-status">نقش</label>
                                <MultiOption name={"roles"} data={["کاربر", "مدیر"]}
                                             selected={item => console.log("checkeddddd : ", item)}/>
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">وضعیت</label>
                                <MultiOption name={"status"} data={["غیرفعال", "فعال"]}
                                             selected={item => console.log("checkeddddd : ", item)}/>
                            </div>

                            {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
                            {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
                            {/*</div>*/}


                        </div>
                    </div>
                </div>

            </div>

            <div className={"filter-search"} onClick={e => handleFade(e)}>
            </div>
            <div className={"filter-content-fix"} id={"userlist"}>
                <div className="row col-12" id={"header-card-custom"}>

                    <div className="col-12">
                        <label
                            htmlFor="users-list-verified">تایید شده</label>
                        <fieldset className={"form-group"}>
                            <select className={"form-control"} id={"confirm"}>
                                <option selected>انتخاب کنید</option>
                                <option>تایید شده</option>
                                <option>تایید نشده</option>
                            </select>

                        </fieldset>
                    </div>

                    <div className="col-12">
                        <label htmlFor="users-list-status">نقش</label>
                        <fieldset className={"form-group"}>
                            <select className={"form-control"} id={"confirm"}>
                                <option selected>انتخاب کنید</option>
                                <option>مدیر</option>
                                <option>کاربر</option>
                            </select>

                        </fieldset>
                    </div>

                    <div className="col-12">
                        <label
                            htmlFor="users-list-role">وضعیت</label>
                        <fieldset className={"form-group"}>
                            <select className={"form-control"} id={"confirm"}>
                                <option selected>انتخاب کنید</option>
                                <option>فعال</option>
                                <option>غیرفعال</option>
                            </select>

                        </fieldset>
                    </div>

                    {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
                    {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
                    {/*</div>*/}


                </div>
            </div>


            <div className={"float-btn"}>
                <ul>

                    <li onClick={e => handleFadeSearch(e)} style={{background: '#424242'}}>
                        <i className={"bx bx-filter-alt"}></i>
                    </li>
                    <li style={{background: '#e65100'}}>
                        <i className={"bx bx-search-alt"} id={"search-float-icons"}
                           onClick={e => handleFadeSearchInput(e)}></i>
                        <div className={"search-input-float"}>
                            <input type={"text"} placeholder={"نام محصول را وارد کنید"}/>
                        </div>

                    </li>
                </ul>
            </div>
        </>

    )


}

export default SearchComponent;
