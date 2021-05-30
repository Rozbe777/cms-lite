import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowPage} from './../../_Micro/PageComponents/TreeShowPage';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import PageAdd from './../../Page/PageAdd'
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";

const LOCAL_CAT = "localcat-zerone-cmslite";

export const PageList = () => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [pageData, setPageData] = useState({})
    const [length, setLength] = useState(0)
    const [breadData] = useState({
        title: 'لیست صفحات',
        desc: 'نمایش لیست صفحات و مدیریت آنها'
    });

    const GetAllPages = () => {
        setLoading(true)
        Request.GetAllPages()
            .then(res => {
                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setPageData(res.data)
            })
            .catch(err => {
                if (err.response.data.errors) {
                    ErroHandle(err.response.data.errors);
                } else {
                    //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                    $(".tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }

            })
    }


    useEffect(() => {
        GetAllPages();
        $(function () {
            $("#show-loader-selected").click(() => {
                handleAddPage();
            })
        })
    }, [])

    const handleAddPage = () => {
        ReactDom.render(<PageAdd display={true} dataUpdate={''} idParent={0}
                                 result={item => handleBackPage(item)}/>, document.getElementById("add-datas"))
    }


    const HandleAdd = (item) => {
        if (item.status == 200) {
            GetAllPages();
            ReactDom.render('', document.getElementById("add-datas"))
        } else {
            console.log("error in add : ", item)
        }
    }

    const HandleDelete = (status) => {
        GetAllPages();

        setCheckBox([])
    }

    const HandleDuplicate = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }



    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllPages();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }
    const handleBackPage = (item) => {
        if (item.status == 200) {
            GetAllPages();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    const HandleAddContentSelect = (data) => {
        handleAddPage();
    }

    // page handlersssss
    const HandleDuplicatePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }
    const handleClickItemPage = (clickId) => {
        ReactDom.render(<PageAdd display={true} idParent={clickId}
                                 dataUpdate={''}
                                 result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }
    const HandleDeletePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }
    const HandleBackLoaderPage = (data) => {
        ReactDom.render(<PageAdd display={true} dataUpdate={data} idParent={0}
                                 result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }


    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }


    const handleDeleteGroup = (event) => {


        finalAllIds.userIds = checkBox;

        finalAllIds._token = $('meta[name="csrf-token"]').attr('content');

        event.preventDefault();
        swal({
            title: 'حذف کاربر',
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
                Request.GroupDelUser(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'کاربر مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                        stringSearchs.params.page = 1;

                        GetAllUser(stringSearchs);
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
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={categoryData} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} icon={"bx bx-plus"} data={breadData}/>
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


                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">
                    {pageData.data && pageData.data.length > 0 && loading == false ? (
                        <TreeShowPage handleCata={itemCat => console.log("cat back ,", itemCat)}
                                      duplicate={item => HandleDuplicatePage(item)}
                                      itemClicks={clicks => handleClickItemPage(clicks)}
                                      callBack={item => HandleDeletePage(item)}
                                      delClick={item => HandleDeletePage(item)}
                                      updateData={item => HandleBackLoaderPage(item)}
                                      data={pageData}
                                      loading={loading}/>
                    ) : loading == false ? (
                        <div>
                            <p style={{textAlign: 'center', marginTop: 20}}>
                                صفحه ای برای نمایش وجود ندارد!
                            </p>
                            <div id={"maines"}>
                                <button id="add-page"
                                        onClick={() => handleAddPage()}
                                        style={{width: 180}}
                                        className="btn btn-primary glow mr-1 mb-1"
                                        type="button">
                                    <span className="align-middle ml-25">افزودن صفحه </span>
                                </button>
                            </div>
                        </div>
                    ) : <Loading/>}
                </div>


                <BackLoader states={item => (HandleAddContentSelect(item))}/>
                <div id={"add-datas"}></div>
                <BottomNavigationBar userData={categoryData} deleteAll={e => handleDeleteGroup(e)}/>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )
}
let elements = document.getElementById("content-managers");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<PageList {...props} />, elements);
}