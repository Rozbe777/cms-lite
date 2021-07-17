import React, {useEffect, useState} from "react";
import {MultiSelected} from "./../ProductManager/HOC/MultiSelected";
import {MultiOption} from "./../ProductManager/HOC/MultiOption";
import {MultiSelectedFilterSwitcher} from "../ProductManager/HOC/MultiSelectedFilterSwitcher";
import $ from 'jquery';
import ReactDOM from "react-dom";
import {NormalFilter, NormalCategorise} from './../../Helper/HelperClassFetures'
import ProductAdd from "../ProductAdd";
import {Request} from "../../../../services/AdminService/Api";
import CategoryApi from './../../Category/Api/CategoryApi';

const SearchComponent = ({searchResult}) => {

    let categoryApi = new CategoryApi();
    const [size, setSize] = useState(0);
    const [load, setLoad] = useState(false)
    const [categories, setCategories] = useState([]);
    const [sizeCategory, setSizeCategory] = useState(0);
    const [search , setSearch] = useState({});
    const [sorting, setSorting] = useState({
        filter: []
    });
    useEffect(() => {
        GetAllCategory();
    }, [])


    const GetAllCategory = () => {
        setLoad(true)

        categoryApi._moduleId = 2;
        categoryApi.call().then(response => {
            setLoad(false)
            setCategories(response.data.data)
        })

    }


    const handleSelected = (select) => {
        let normalizes = NormalFilter(select);
        let sortings = {...sorting};
        sortings.status = normalizes["status"] ? normalizes["status"] : false;
        sortings.entity = normalizes["entity"] ? normalizes["entity"] : false;
        sortings.discount = normalizes["discount"] ? normalizes["discount"] : false;
        setSorting(sortings);
        searchResult(sortings);
        setSize(select.length)
    }


    const handleCategory = (item) => {
        let categorise = NormalCategorise(item);
        let sortings = {...sorting};
        sortings.categorise = categorise;
        setSorting(sortings);
        searchResult(sortings);
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
        searchResult(sortings);
    }

    const HandleSearchInput = e => {
        e.preventDefault();
        let sortings = {...sorting};
        sortings[e.target.name] = e.target.value;
        setSorting(sortings);
        searchResult(sortings);
    }


    const tagsSearchSelected = (tagData) => {
        let tagsId = [];
        tagData.map(tagsDataItem => {
            tagsId.push(tagsDataItem.id);
        })
        let oldSearch = {...search};
        oldSearch.tags = tagsId;
        setSearch(oldSearch)
        searchResult(oldSearch)
    }


    return (
        <div className={"container-fluid"} style={{padding: '0px 4px'}}>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>

                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className="row col-12" id={"header-card-custom"}>

                        {_renderSearchInput()}

                        {_renderFilter()}

                        {_renderSorting()}


                        {_renderCategory()}


                    </div>
                </div>
            </div>

            <div className={"filter-search"} onClick={e => handleFade(e)}>
            </div>
            <div className={"filter-content-fix"}>
                <div className="row col-12" id={"header-card-custom"}>

                    {_renderFilter()}

                    {_renderSorting()}

                    {_renderCategory()}

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


    function _renderCategory(){
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label
                    htmlFor="users-list-role">{sizeCategory > 0 ? "( " + sizeCategory + " ) دسته بندی انتخاب شده " : 'دسته بندی'}</label>
                <MultiSelected name={"tags"} data={categories ? categories : []}
                               selected={item => tagsSearchSelected(item)}

                />
            </div>
        )
    }

    function _renderSearchInput(){
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-verified">جستجو</label>
                <input type="text" className="form-control"
                       id={"search_input"}
                       onChange={e => HandleSearchInput(e)}
                       placeholder="جستجو با نام محصول ..." name="search"/>

            </div>
        )
    }

    function _renderSorting(){
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-status">مرتب سازی</label>
                <MultiOption data={dataSort} selected={item => handleOptionSort(item)}/>
            </div>
        )
    }

    function _renderFilter(){
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label
                    htmlFor="users-list-verified">{size > 0 ? "( " + size + " ) فیلتر اعمال شده " : 'فیلتر'}</label>

                <MultiSelectedFilterSwitcher dataRes={dataFilter} selected={sel => handleSelected(sel)}/>
            </div>
        )
    }

}

export default SearchComponent;
