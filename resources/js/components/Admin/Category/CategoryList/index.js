import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import AddCategory from './../CategoryAdd';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import NotFound from "../../_Micro/NotFound";

const LOCAL_CAT = "localcat-zerone-cmslite";

export const CategoryList = () => {
    const [checkBox, setCheckBox] = useState([]);
    const [dispaly, setDisplay] = useState(false)
    const [dispalyAdd, setDisplayAdd] = useState({dispaly: false})
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [categoryDataTotal, setCategoryDataTotal] = useState()
    const [pageData, setPageData] = useState({})
    const [length, setLength] = useState(0)
    const [breadData] = useState({
        title: 'لیست دسته بندی ها',
        desc: 'نمایش لیست دسته بندی ها و مدیریت آنها'
    });


    let finalAllIds = {};


    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {

                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setCategoryData(res.data.data)
                setLength(res.data.data.length);
                setCategoryDataTotal(res.data)
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

    // reload page after error in loading

    function reloadpage() {
        console.log("svdvsdv");
        window.location.pathname = "/categories";
    }


    useEffect(() => {
        GetAllCategory();

    }, [])


    const handleAddCategory = (e) => {
        e.preventDefault()
        console.log("category data : ", categoryData);
        if (!loading) {
            ReactDom.render(<AddCategory display={true}
                                         dataAll={JSON.stringify(categoryData)}
                                         result={item => handleBackPage(item)}/>, document.getElementById("add-datas"))
        } else {
        }
    }

    const HandleAdd = (item) => {
        GetAllCategory();

    }

    const handleBackPage = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const HandleDelete = (status) => {
        GetAllCategory();
        setCheckBox([])
    }

    const HandleDuplicate = (status) => {
        GetAllCategory();
    }

    const handleClickItem = (clickId) => {
        ReactDom.render(<AddCategory display={true} idParent={clickId}
                                     dataAll={JSON.stringify(categoryData)}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }

    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    const HandleBackLoader = (data) => {
        // console.log("+++++++" , JSON.parse(JSON.parse(data).allData).parent_id)
        // console.log("dupppffffffp : " ,data )

        let id_parents = JSON.parse(data).allData.parent_id;
        ReactDom.render(<AddCategory display={true} dataUpdate={data}
                                     dataAll={JSON.stringify(categoryData)}
                                     idParent={id_parents}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }

    const HandleAddContentSelect = (data) => {
        handleAddCategory();

    }

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

        console.log("dataaaaaa : ", finalAllIds)
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


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>


                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={categoryDataTotal} data={checkBox}/>
                    <BreadCrumbs data={breadData} titleBtn={"افزودن"} icon={"bx bx-plus"}
                                 clicked={e => handleAddCategory(e)}/>
                </div>


                <div className={"loaderErrorBack"}>
                    <div clssName={"container"}>
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
                        {!loading ? categoryData ? categoryData.length > 0 ? (
                            <TreeShowCategory handleCata={itemCat => console.log("cat back ,", itemCat)}
                                              duplicate={item => HandleDuplicate(item)}
                                              itemClicks={clicks => handleClickItem(clicks)}
                                              callBack={item => HandleDelete(item)}
                                              delClick={item => HandleDelete(item)}
                                              updateData={item => HandleBackLoader(item)}
                                              data={categoryData}
                                              loading={loading}/>
                        ) : (
                            <div>
                                <NotFound/>
                                <div id={"maines"}>
                                    <button id="add-category"
                                            onClick={(e) => handleAddCategory(e)}
                                            style={{width: 180, marginTop: '35px'}}
                                            className="btn btn-primary glow mr-1 mb-1"
                                            type="button">
                                        <span className="align-middle ml-25">افزودن دسته بندی</span>
                                    </button>
                                </div>
                            </div>
                        ) : <Loading/> : <Loading/>}
                    </div>


                    {/*<div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">*/}
                    {/*    {pageData.data && pageData.data.length > 0 && loading == false ? (*/}
                    {/*        <TreeShowPage handleCata={itemCat => console.log("cat back ,", itemCat)}*/}
                    {/*                      duplicate={item => HandleDuplicatePage(item)}*/}
                    {/*                      itemClicks={clicks => handleClickItemPage(clicks)}*/}
                    {/*                      callBack={item => HandleDeletePage(item)}*/}
                    {/*                      delClick={item => HandleDeletePage(item)}*/}
                    {/*                      updateData={item => HandleBackLoaderPage(item)}*/}
                    {/*                      data={pageData}*/}
                    {/*                      loading={loading}/>*/}
                    {/*    ) : loading == false ? (*/}
                    {/*        <div>*/}
                    {/*            <p style={{textAlign: 'center', marginTop: 20}}>*/}
                    {/*                صفحه ای برای نمایش وجود ندارد!*/}
                    {/*            </p>*/}
                    {/*            <div id={"maines"}>*/}
                    {/*                <button id="add-category"*/}
                    {/*                        onClick={() => handleAddPage()}*/}
                    {/*                        style={{width: 180}}*/}
                    {/*                        className="btn btn-primary glow mr-1 mb-1"*/}
                    {/*                        type="button">*/}
                    {/*                    <span className="align-middle ml-25">افزودن صفحه </span>*/}
                    {/*                </button>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ) : <Loading/>}*/}
                    {/*</div>*/}


                </div>


                <BackLoader states={item => (HandleAddContentSelect(item))}/>
                <div id={"add-datas"}></div>
                <BottomNavigationBar userData={categoryData} deleteAll={e => handleDeleteGroup(e)}/>

            </div>

            <div className={"float-btn-add"} onClick={e => handleAddCategory(e)}>
                <i className="bx bx-plus"></i>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )
}
let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
