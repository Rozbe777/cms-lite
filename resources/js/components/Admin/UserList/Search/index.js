import React, {useEffect, useState} from "react";
import {MultiOption} from "./../../Shop/ProductManager/HOC/MultiOption";
import $ from 'jquery';

const SearchComponent = ({total , searchRes: pushSearchRes}) => {

    const [size, setSize] = useState(0);
    const [sizeCategory, setSizeCategory] = useState(0);
    const [search , setSearch] = useState({});
    useEffect(() => {

    },[])


    const handleFade = (e) => {
        $(".filter-content-fix").removeClass("active")
        setTimeout(() => {
            $(".filter-search").removeClass("active");
        }, 100);
    }

    const handleFadeSearchInput = (e) => {
        $(".search-input-float").toggleClass("active");
    }




    const handleFadeSearch = (e) => {
        e.preventDefault();
        $(".filter-search").addClass("active");
        setTimeout(() => {
            $(".filter-content-fix").addClass("active")
        }, 100);
    }


    const handleInputSearch = e => {
        e.preventDefault();
        let searchOld = {...search};
        searchOld.search = e.target.value;
        setSearch(searchOld)
        pushSearchRes(searchOld)
    }


    const responsiveSeach = (e) => {
        let searchOlds = {...search};

        searchOlds[e.target.name] = e.target.value;
        setSearch(searchOlds)
        pushSearchRes(searchOlds)
    }

    return (
        <>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>
                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className={"container-fluid"}>

                        <div className="row col-12" id={"header-card-custom"}>

                            <div className="col-md-6 col-sm-12 col-lg-3">
                                <label htmlFor="users-list-verified">جستجو</label>
                                <input type="text" className="form-control"
                                       id={"search_input"}
                                       onChange={e => handleInputSearch(e)}
                                       placeholder="جستجو با ایمیل و تلفن ..." name="search"/>

                            </div>


                            <div className="col-12 col-sm-6 col-lg-3">
                                <label htmlFor="users-list-status">نقش</label>
                                <MultiOption name={"role"} data={[{
                                    id : "مدیر",
                                    name : "مدیر"
                                },{
                                    id : "کاربر",
                                    name : "کاربر"
                                }]}
                                             selected={item => {
                                                 let oldSearch = {...search};
                                                 oldSearch.role_id = item == "مدیر" ? 1  : item=="کاربر" ? 2 : '';
                                                 setSearch(oldSearch)
                                                 pushSearchRes(oldSearch)
                                             }}
                                />
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">وضعیت</label>
                                <MultiOption name={"status"} data={[{
                                    id : "فعال",
                                    name : "فعال"
                                },{
                                    id : "غیرفعال",
                                    name : "غیرفعال"
                                }]}
                                             selected={item => {
                                                 let oldSearch = {...search};
                                                 oldSearch.status = item == "فعال" ? "active"  : item=="غیرفعال" ? "deactivate" : '';
                                                 setSearch(oldSearch)
                                                 pushSearchRes(oldSearch)
                                             }}
                                />
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">تعداد نمایش</label>
                                <MultiOption name={"status"} data={[{
                                    id : "10",
                                    name : "10"
                                },{
                                    id : "15",
                                    name : "15"
                                },{
                                    id : "20",
                                    name : "20"
                                },{
                                    id : "نمایش همه",
                                    name : "نمایش همه"
                                }]}
                                             selected={item => {
                                                 let oldSearch = {...search};
                                                 oldSearch.pageSize = item == "نمایش همه" ? total  : parseInt(item);
                                                 setSearch(oldSearch)
                                                 pushSearchRes(oldSearch)
                                             }}

                                />
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
                            htmlFor="users-list-verified">وضعیت</label>
                        <fieldset className={"form-group"}>
                            <select defaultValue={"nn"} onChange={e => responsiveSeach(e)} name={"status"} className={"form-control"} id={"confirm"}>
                                <option value={"nn"}>انتخاب کنید</option>
                                <option value={"active"}>فعال</option>
                                <option value={"deactivate"}>غیرفعال</option>
                            </select>

                        </fieldset>
                    </div>

                    <div className="col-12">
                        <label htmlFor="users-list-status">نقش</label>
                        <fieldset className={"form-group"}>
                            <select defaultValue={"0"} onChange={e => responsiveSeach(e)} name={"role_id"} className={"form-control"} id={"confirm"}>
                                <option  value={"0"}>انتخاب کنید</option>
                                <option value={"1"}>مدیر</option>
                                <option value={"2"}>کاربر</option>
                            </select>

                        </fieldset>
                    </div>

                    <div className="col-12">
                        <label
                            htmlFor="users-list-role">تعداد نمایش</label>
                        <fieldset className={"form-group"}>
                            <select defaultValue={"5"} onChange={e => responsiveSeach(e)} name={"pageSize"} className={"form-control"} id={"confirm"}>
                                <option value={"5"}>انتخاب کنید</option>
                                <option value={"10"}>10</option>
                                <option value={"15"}>15</option>
                                <option value={"20"}>20</option>
                                <option value={total}>نمایش همه</option>
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
                            <input type={"text"} placeholder={"نام محصول را وارد کنید"} onChange={e => handleInputSearch(e)}/>
                        </div>

                    </li>
                </ul>
            </div>
        </>

    )


}

export default SearchComponent;
