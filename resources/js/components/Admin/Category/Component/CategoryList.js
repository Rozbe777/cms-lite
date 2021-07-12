import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import Loading from './../../_Micro/Loading';
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import NotFound from "../../_Micro/NotFound";
import CategoryAdd from "./CategoryAdd";
import CategoryApi from "../Api/CategoryApi";

export const CategoryList = ({token}) => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [categoryDataTotal, setCategoryDataTotal] = useState()
    const [pageData, setPageData] = useState({})
    const [length, setLength] = useState(0)
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

    const resultForm = (statued) => {
        if (statued) {
            GetAllCategory();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    // const handleAddCategory = (e) => {
    //     e.preventDefault()
    //     if (!loading) {
    //         ReactDom.render(<AddCategory
    //             handleResult={resultForm}
    //             display={true} token={token}
    //             dataAll={JSON.stringify(categoryData)}
    //         />, document.getElementById("add-datas"))
    //     } else {
    //     }
    // }


    const HandleDelete = (status) => {
        GetAllCategory();
        setCheckBox([])
    }

    const HandleDuplicate = (status) => {
        GetAllCategory();
    }

    // const handleClickItem = (clickId) => {
    //     ReactDom.render(<AddCategory display={true} idParent={clickId}
    //                                  token={token}
    //                                  dataAll={JSON.stringify(categoryData)}
    //                                  result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    // }

    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    // const HandleAddContentSelect = (data) => {
    //     handleAddCategory();
    //
    // }

    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }


    const handleDeleteGroup = (event) => {


        finalAllIds.categoryIds = checkBox;

        finalAllIds._token = $('meta[name="csrf-token"]').attr('content');

        event.preventDefault();
        swal({
            title: 'حذف دسته بندی',
            text: "آیا مطمئنید؟",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'تایید',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: 'انصراف',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.GroupDelCategory(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'دسته بندی مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                        GetAllCategory();
                    }).catch(error => {
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                })
            }
        });
    }


    const handleReload = (actionRes) => {
        GetAllCategory();
        ReactDom.render('', document.getElementById('add-datas'))
    }

    const onAddCategory = (e) => {
        e.preventDefault();
        ReactDom.render(<CategoryAdd actionResult={handleReload}/>, document.getElementById("add-datas"))
    }


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>

                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={categoryDataTotal} data={checkBox}/>
                    <BreadCrumbs data={breadData} titleBtn={"افزودن"} icon={"bx bx-plus"}
                                 onClicked={onAddCategory}/>
                </div>

                <div className={"loaderErrorBack"}>
                    <div className={"container"}>
                        <div className={"row justify-content-center"}>
                            <div className={"col-lg-4 col-md-5 col-sm-10"} style={{top: '14vh'}}>
                                <div className={"cardError"}>
                                    <div className={"iconError"}>
                                        <i className={"bx bx-error-circle"}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-content" style={{padding: 0}}>
                    <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">
                        {_renderCategoryList()}
                    </div>


                </div>


                <div id={"add-datas"}></div>
                <BottomNavigationBar userData={categoryDataTotal} deleteAll={e => handleDeleteGroup(e)}/>

            </div>

            <div className={"float-btn-add"} onClick={e => onAddCategory(e)}>
                <i className="bx bx-plus"></i>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )

    function _renderCategoryList() {
        console.log("____", categoryData)
        if (loading === true) {
            return (<Loading/>)
        } else {
            if (categoryData) {
                return (
                    <TreeShowCategory
                        contentData={categoryData}
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
