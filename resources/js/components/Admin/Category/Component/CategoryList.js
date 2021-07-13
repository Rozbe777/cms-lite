import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import Loading from './../../_Micro/Loading';
import $ from 'jquery';
import {ErroHandle, error as ErrorToast, successSwal, swalAccept} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import NotFound from "../../_Micro/NotFound";
import CategoryAdd from "./CategoryAdd";
import CategoryApi from "../Api/CategoryApi";

export const CategoryList = ({token}) => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([])
    const [breadData] = useState({
        title: 'لیست دسته بندی ها',
        desc: 'نمایش لیست دسته بندی ها و مدیریت آنها'
    });


    let categoryApi = new CategoryApi();

    let finalAllIds = {};


    const GetAllCategory = () => {
        setLoading(true);
        categoryApi.call().then(response => {
            setLoading(false);
            setCategoryData(response.data);
        }).catch(err => {
            if (err.response.data.errors) {
                ErroHandle(err.response.data.errors);
            } else {
                $(".tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
    }


    useEffect(() => {
        GetAllCategory();

    }, [])




    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }



    const multiCategoryDelete = (e) => {
        e.preventDefault();
        categoryApi.categoryIds = checkBox;
        // show swal for get accept delete
        swalAccept(`حذف گروهی از دسته بندی ها`).then(resSwal => {
            if (resSwal.value) {
                categoryApi.delete().then(res => {
                    successSwal("با موفقیت حذف شدند !");
                    $(".pagination li.page-item.numberss").removeClass("active")
                    $("ul.pagination li").eq(1).addClass("active")
                    $("span.checkboxeds").removeClass("active");

                    $("li.page-item.numberss").removeClass("active");
                    $("li.page-item").eq(1).addClass("active");
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);
                    setCheckBox([]);
                    handleReload(res);
                })
            }
        })
    }


    const handleReload = (actionRes) => {
        GetAllCategory();
        ReactDom.render('', document.getElementById('add-datas'))
    }

    const onAddCategory = (e) => {
        e.preventDefault();
        ReactDom.render(<CategoryAdd actionResult={handleReload} categoryData={categoryData}/>, document.getElementById("add-datas"))
    }

    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>

                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => multiCategoryDelete(e)}
                                  allData={categoryData} data={checkBox}/>
                    <BreadCrumbs data={breadData} titleBtn={"افزودن"} icon={"bx bx-plus"}
                                 onClicked={onAddCategory}/>
                </div>


                <div className="tab-content" style={{padding: 0}}>
                    <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">
                        {_renderCategoryList()}
                    </div>


                </div>


                <div id={"add-datas"}></div>
                <BottomNavigationBar userData={categoryData} deleteAll={e => handleDeleteGroup(e)}/>

            </div>

            <div className={"float-btn-add"} onClick={e => onAddCategory(e)}>
                <i className="bx bx-plus"></i>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )

    function _renderCategoryList() {
        if (loading === true) {
            return (<Loading/>)
        } else {
            if (categoryData.data) {
                return (
                    <TreeShowCategory
                        categoryData={categoryData}
                        loading={loading}
                        actionResult={handleReload}
                    />
                )
            } else {
                return (
                    <div style={{width: '100%'}}>
                        <div id={"maines"}>
                            <button id="add-page"
                                    onClick={e => onAddCategory(e)}
                                    style={{width: 180}}
                                    className="btn btn-primary glow mr-1 mb-1"
                                    type="button">
                                <span className="align-middle ml-25">افزودن محتوا </span>
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }
}
let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
