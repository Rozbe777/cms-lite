import React, {useEffect, useState} from "react";
import {MultiSelected} from "./../ProductManager/HOC/MultiSelected";
import {MultiOption} from "./../ProductManager/HOC/MultiOption";
import {MultiSelectedFilterSwitcher} from "../ProductManager/HOC/MultiSelectedFilterSwitcher";
import $ from 'jquery';
import ReactDOM from "react-dom";
import {NormalFilter, NormalCategorise} from './../../Helper/HelperClassFetures'
import ProductAdd from "../ProductAdd";
import {Request} from "../../../../services/AdminService/Api";

const SearchComponent = ({sort: pushSort}) => {

    const [size, setSize] = useState(0);
    const [load, setLoad] = useState(false)
    const [categories, setCategories] = useState([]);
    const [sizeCategory, setSizeCategory] = useState(0);
    const [sorting, setSorting] = useState({
        filter: []
    });
    useEffect(() => {
        GetAllCategory();
    }, [])


    const GetAllCategory = () => {
        setLoad(true)
        Request.GetAllCategory()
            .then(res => {
                setLoad(false)
                setCategories(res.data.data)
            })
    }


    const handleSelected = (select) => {
        let normalizes = NormalFilter(select);
        let sortings = {...sorting};
        sortings.status = normalizes["status"] ? normalizes["status"] : false;
        sortings.entity = normalizes["entity"] ? normalizes["entity"] : false;
        sortings.discount = normalizes["discount"] ? normalizes["discount"] : false;
        setSorting(sortings);
        pushSort(sortings);
        setSize(select.length)
    }


    const handleCategory = (item) => {
        let categorise = NormalCategorise(item);
        let sortings = {...sorting};
        sortings.categorise = categorise;
        setSorting(sortings);
        pushSort(sortings);
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
        ReactDOM.render(<ProductAdd/>, document.getElementById("add-product"));
    }

    const handleFadeSearch = (e) => {
        e.preventDefault();
        $(".filter-search").addClass("active");
        setTimeout(() => {
            $(".filter-content-fix").addClass("active")
        }, 100);
    }


    let dataFilter = [
        {
            name: "entity",
            value: ' موجودها'
        }, {
            name: 'status',
            value: ' فعال ها'
        }, {
            name: 'discount',
            value: ' تخفیف دار ها'
        }
    ]


    let dataSort = [
        {
            id: "created_at",
            name: "بر اساس تاریخ انتشار"
        }, {
            id: "price",
            name: "بر اساس قیمت"
        }, {
            id: 'count',
            name: "بر اساس موجودی",
        }, {
            id: 'discount',
            name: "بر اساس تخفیف",
        }
    ]


    const handleOptionSort = (data) => {
        let sortings = {...sorting};
        sortings.sort = data;
        setSorting(sortings);
        pushSort(sortings);
    }

    const HandleSearchInput = e => {
        e.preventDefault();
        let sortings = {...sorting};
        sortings[e.target.name] = e.target.value;
        setSorting(sortings);
        pushSort(sortings);
    }


    return (
        <div className={"container-fluid"} style={{padding: '0px 4px'}}>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>

                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className="row col-12" id={"header-card-custom"}>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-verified">جستجو</label>
                            <input type="text" className="form-control"
                                   id={"search_input"}
                                   onChange={e => HandleSearchInput(e)}
                                   placeholder="جستجو با نام محصول ..." name="search"/>

                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label
                                htmlFor="users-list-verified">{size > 0 ? "( " + size + " ) فیلتر اعمال شده " : 'فیلتر'}</label>

                            <MultiSelectedFilterSwitcher dataRes={dataFilter} selected={sel => handleSelected(sel)}/>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-status">مرتب سازی</label>
                            <MultiOption data={dataSort} selected={item => handleOptionSort(item)}/>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label
                                htmlFor="users-list-role">{sizeCategory > 0 ? "( " + sizeCategory + " ) دسته بندی انتخاب شده " : 'دسته بندی'}</label>
                            <MultiSelected data={categories} selected={itemsSel => handleCategory(itemsSel)}/>
                        </div>

                        {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
                        {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
                        {/*</div>*/}


                    </div>
                </div>
            </div>

            <div className={"filter-search"} onClick={e => handleFade(e)}>
            </div>
            <div className={"filter-content-fix"}>
                <div className="row col-12" id={"header-card-custom"}>

                    <div className="col-12 col-sm-6 col-lg-3" id={"filterPro"}>
                        <label
                            htmlFor="users-list-verified">{size > 0 ? "( " + size + " ) فیلتر اعمال شده " : 'فیلتر'}</label>

                        <MultiSelectedFilterSwitcher let={"bottom"} dataRes={dataFilter} selected={sel => handleSelected(sel)}/>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3" id={"productsSort"}>
                        <label htmlFor="users-list-status">مرتب سازی</label>
                        <MultiOption lett={"bottom"} data={dataSort} selected={item => handleOptionSort(item)}/>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <label
                            htmlFor="users-list-role">{sizeCategory > 0 ? "( " + sizeCategory + " ) دسته بندی انتخاب شده " : 'دسته بندی'}</label>
                        <MultiSelected let={"bottom"} data={categories} selected={itemsSel => handleCategory(itemsSel)}/>
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
                            <input onChange={e => HandleSearchInput(e)}
                                   name="search"
                                   type={"text"} placeholder={"جستجو با نام محصول ..."}/>
                        </div>

                    </li>
                    <li onClick={e => HandleResponsiveAdd(e)} style={{background: '#0d47a1'}}>
                        <i className={"bx bx-plus"}></i>
                    </li>
                </ul>
            </div>


        </div>
    )


}

export default SearchComponent;
