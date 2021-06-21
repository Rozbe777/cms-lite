import React, {useEffect, useState} from "react";
import {MultiOption} from "./../../Shop/ProductManager/HOC/MultiOption";
import {MultiSelected} from "./../../Shop/ProductManager/HOC/MultiSelected";
import $ from 'jquery';
import {Request} from "../../../../services/AdminService/Api";
import {ErroHandle, error as ErrorToast} from "../../../../helper";

const SearchComponent = ({tagReload, total, searchRes: pushSearchRes}) => {


    const [size, setSize] = useState(0);
    const [sizeCategory, setSizeCategory] = useState(0);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [tagData, setTagData] = useState()
    const [search, setSearch] = useState({});
    useEffect(() => {
        GetAllCategory();
        GetAllTag()

    }, [])

    let idss = [];


    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {
                setLoading(false)
                setCategoryData(res.data.data)
            })
            .catch(err => {
                if (err.response.data.errors) {
                    ErroHandle(err.response.data.errors);
                } else {
                    //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                    $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }

            })
    }

    const GetAllTag = () => {
        setLoading(true)
        Request.GetAllTags()
            .then(res => {
                setLoading(false)
                setTagData(res.data.data.data)
            })
            .catch(err => {
                if (err.response.data.errors) {
                    ErroHandle(err.response.data.errors);
                } else {
                    //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                    $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
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
                                       placeholder="جستجو با نام ..." name="search"/>

                            </div>


                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">دسته بندی</label>
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               selected={item => {
                                                   item.map(ii => {
                                                       idss.push(ii);
                                                   })
                                                   let oldSearch = {...search};
                                                   oldSearch.categories = idss;
                                                   setSearch(oldSearch)
                                                   pushSearchRes(oldSearch)
                                               }}

                                />
                            </div>

                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">وضعیت</label>
                                <MultiOption name={"status"} data={[{
                                    id : 'منتشر شده',
                                    name : 'منتشر شده'
                                },{
                                    id : 'منتشر نشده',
                                    name : 'منتشر نشده'
                                }]}
                                             selected={item => {
                                                 let oldSearch = {...search};
                                                 oldSearch.status = item == "منتشر شده" ? "active" : item == "منتشر نشده" ? "deactivate" : '';
                                                 setSearch(oldSearch)
                                                 pushSearchRes(oldSearch)
                                             }}
                                />
                            </div>


                            <div className="col-12 col-sm-6 col-lg-3">
                                <label
                                    htmlFor="users-list-role">برچسپ</label>
                                <MultiSelected name={"tags"} data={tagData ? tagData : []}
                                               selected={item => {
                                                   let oldSearch = {...search};
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
                    <div className="col-12 col-sm-6 col-lg-3">
                        <label
                            htmlFor="users-list-role">دسته بندی</label>
                        <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                       selected={item => {
                                           item.map(ii => {
                                               idss.push(ii);
                                           })
                                           let oldSearch = {...search};
                                           oldSearch.categories = idss;
                                           setSearch(oldSearch)
                                           pushSearchRes(oldSearch)
                                       }}

                        />
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <label
                            htmlFor="users-list-role">وضعیت</label>
                        <MultiOption name={"status"} data={[{
                            id : 'منتشر شده',
                            name : 'منتشر شده'
                        },{
                            id : 'منتشر نشده',
                            name : 'منتشر نشده'
                        }]}
                                     selected={item => {
                                         let oldSearch = {...search};
                                         oldSearch.status = item == "منتشر شده" ? "active" : item == "منتشر نشده" ? "deactivate" : '';
                                         setSearch(oldSearch)
                                         pushSearchRes(oldSearch)
                                     }}
                        />
                    </div>


                    <div className="col-12 col-sm-6 col-lg-3">
                        <label
                            htmlFor="users-list-role">برچسپ</label>
                        <MultiSelected name={"tags"} data={tagData ? tagData : []}
                                       selected={item => {
                                           let oldSearch = {...search};
                                           setSearch(oldSearch)
                                           pushSearchRes(oldSearch)
                                       }}

                        />
                    </div>

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
                            <input type={"text"} placeholder={"نام محصول را وارد کنید"}
                                   onChange={e => handleInputSearch(e)}/>
                        </div>

                    </li>
                </ul>
            </div>
        </>

    )


}

export default SearchComponent;
