import React, {useEffect, useState} from "react";
import {MultiOption} from "./../../Shop/component/HOC/MultiOption";
import {MultiSelected} from "./../../Shop/component/HOC/MultiSelected";
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import ContentsApi from "../Api/ContentApi";
import CategoryApi from "../../Category/Api/CategoryApi";

const SearchComponent = ({searchResultSelected}) => {


    const [categoryData, setCategoryData] = useState()
    const [tagData, setTagData] = useState()
    const [search, setSearch] = useState({});
    let contentApi = new ContentsApi();
    let categoryApi = new CategoryApi();



    useEffect(() => {
        GetAllCategory();
        GetAllTag()

    }, [])


    const GetAllCategory = () => {
        categoryApi.call().then(response => {
            setCategoryData(response.data.data)
        }).catch(error => {
            if (error.response.data.errors) {
                ErroHandle(error.response.data.errors);
            } else {
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
    }

    const GetAllTag = () => {
        contentApi.getAllTags().then(response => {
            setTagData(response.data.data.data)
        }).catch(error => {
            if (error.response.data.errors) {
                ErroHandle(error.response.data.errors);
            } else {
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
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
        searchResultSelected(searchOld)
    }


    const categoriesSearchSelected = (categoryData) => {
        let categoriesId = [];
        categoryData.map(categoryDataItem => {
            categoriesId.push(categoryDataItem.id);
        })
        let oldSearch = {...search};
        oldSearch.categories = categoriesId;
        setSearch(oldSearch)
        searchResultSelected(oldSearch)
    }
    const tagsSearchSelected = (tagData) => {
        let tagsId = [];
        tagData.map(tagsDataItem => {
            tagsId.push(tagsDataItem.id);
        })
        let oldSearch = {...search};
        oldSearch.tags = tagsId;
        setSearch(oldSearch)
        searchResultSelected(oldSearch)
    }

    const statusSearchSelected = (status) => {
        let oldSearch = {...search};
        oldSearch.status = status == "منتشر شده" ? "active" : status == "منتشر نشده" ? "deactivate" : '';
        setSearch(oldSearch)
        searchResultSelected(oldSearch)
    }
    return (
        <>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>
                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className={"container-fluid"}>

                        <div className="row col-12" id={"header-card-custom"}>

                            {_renderSearchInput()}


                            {_renderCategories()}

                            {_renderStatus()}

                            {_renderTags()}
                        </div>
                    </div>
                </div>

            </div>

            <div className={"filter-search"} onClick={e => handleFade(e)}>
            </div>
            <div className={"filter-content-fix"} id={"userlist"}>
                <div className="row col-12" id={"header-card-custom"}>
                    {_renderCategories()}

                    {_renderStatus()}


                    {_renderTags()}

                </div>
            </div>


            {_renderFloadBtnSearch()}
        </>

    )



    function _renderFloadBtnSearch(){
        return (
            <div className={"float-btn"}>
                <ul>

                    <li onClick={e => handleFadeSearch(e)} style={{background: '#424242'}}>
                        <i className={"bx bx-filter-alt"}></i>
                    </li>
                    <li style={{background: '#e65100'}}>
                        <i className={"bx bx-search-alt"} id={"search-float-icons"}
                           onClick={e => handleFadeSearchInput(e)}></i>
                        <div className={"search-input-float"}>
                            <input type={"text"} placeholder={"نام محصول را وارد کنید"}
                                   onChange={e => handleInputSearch(e)}/>
                        </div>

                    </li>
                </ul>
            </div>
        )
    }

    function _renderSearchInput(){
        return (
            <div className="col-md-6 col-sm-12 col-lg-3">
                <label htmlFor="users-list-verified">جستجو</label>
                <input type="text" className="form-control"
                       id={"search_input"}
                       onChange={e => handleInputSearch(e)}
                       placeholder="جستجو با نام ..." name="search"/>

            </div>
        )
    }

    function _renderTags() {
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label
                    htmlFor="users-list-role">برچسپ</label>
                <MultiSelected name={"tags"} data={tagData ? tagData : []}
                               selected={item => tagsSearchSelected(item)}

                />
            </div>
        )
    }


    function _renderCategories() {
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label
                    htmlFor="users-list-role">دسته بندی</label>
                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                               selected={item => categoriesSearchSelected(item)}

                />
            </div>
        )
    }

    function _renderStatus() {
        return (
            <div className="col-12 col-sm-6 col-lg-3">
                <label
                    htmlFor="users-list-role">وضعیت</label>
                <MultiOption name={"status"} data={[{
                    id: 'منتشر شده',
                    name: 'منتشر شده'
                }, {
                    id: 'منتشر نشده',
                    name: 'منتشر نشده'
                }]}
                             selected={item => statusSearchSelected(item)}
                />
            </div>

        )
    }

}

export default SearchComponent;
