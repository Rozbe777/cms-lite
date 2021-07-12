import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
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
import {Pagination} from "../../_Micro/Pagination";
import NotFound from "../../_Micro/NotFound";

const LOCAL_CAT = "localcat-zerone-cmslite";

export const PageList = (props) => {
    const {token} = props;
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [pageData, setPageData] = useState({})
    const [pageAll, setPageAll] = useState({})

    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState();


    const [length, setLength] = useState(0)
    const [breadData] = useState({
        title: 'لیست صفحه',
        desc: 'نمایش لیست صفحه و مدیریت آنها'
    });


    const GetAllPages = () => {
        setLoading(true)
        Request.GetAllPages()
            .then(res => {
                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setPageData(res.data)
                setPerPage(res.data.data.per_page);
                setPageAll(res.data.data.data)
                setTotal(res.data.data.total);
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
        ReactDom.render(<PageAdd token={token} display={true} dataUpdate={''} idParent={0}
                                 result={item => handleBackPage(item)}/>, document.getElementById("add-datas"))
    }


    const HandleAdd = (item) => {
        if (item.status == 200) {
            GetAllPages();
            ReactDom.render('', document.getElementById("add-datas"))
        } else {
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

    const HandleAddPageSelect = (data) => {
        handleAddPage();
    }

    // Page handlersssss
    const HandleDuplicatePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
        }
    }
    const handleClickItemPage = (clickId) => {
        ReactDom.render(<PageAdd token={token} display={true} idParent={clickId}
                                 dataUpdate={''}
                                 result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }
    const HandleDeletePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
        }
    }

    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }


    const handleDeleteGroup = (event) => {

        let finalAllIds = {};
        finalAllIds.pageIds = checkBox;

        finalAllIds._token = $('meta[name="csrf-token"]').attr('Page');

        event.preventDefault();
        swal({
            title: 'حذف صفحه',
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
                Request.GroupDelPage(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'صفحه مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })


                        GetAllPages();
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


    const paginate = (pageNumber) => {

        $(".backLoadings").fadeIn();
        GetAllPages();
        if (pageNumber == Math.ceil(total / perPage)) {
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 1);
        } else if (pageNumber == 1) {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss." + pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
            $("li.page-item.next").css("opacity", 2);
            $("li.page-item.previous").css("opacity", 2);
        }
    };


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={pageData.data ? pageData.data : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} icon={"bx bx-plus"} data={breadData}/>
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


                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">
                    {loading === false && pageData.data ? pageData.data.data.length > 0 ? (
                        <TreeShowPage
                            duplicate={item => HandleDuplicate(item)}
                            itemClicks={clicks => handleClickItemPage(clicks)}
                            callBack={item => HandleDeletePage(item)}
                            delClick={item => HandleDeletePage(item)}
                            updateData={item => HandleBackLoaderPage(item)}
                            token={token}
                            data={pageData}
                            loading={loading}/>
                    ) : (
                        <div>
                            <NotFound/>
                            <div id={"maines"}>
                                <button id="add-category"
                                        onClick={(e) => handleAddPage(e)}
                                        style={{width: 180, marginTop: '35px'}}
                                        className="btn btn-primary glow mr-1 mb-1"
                                        type="button">
                                    <span className="align-middle ml-25">افزودن صفحه</span>
                                </button>
                            </div>
                        </div>
                    ) : <Loading/>}


                </div>


                <div id={"add-datas"}></div>
                {/*<div className="col-md-12">*/}
                {/*    {pageAll.data ? pageAll.data.length ? (*/}
                {/*        <Pagination*/}
                {/*            firstPageUrl={pageAll.first_page_url}*/}
                {/*            lastPageUrl={pageAll.last_page_url}*/}
                {/*            currentPage={pageAll.cuerrent_page}*/}
                {/*            perPage={perPage}*/}
                {/*            users={pageAll}*/}
                {/*            total={total}*/}
                {/*            paginate={paginate}*/}
                {/*        />*/}
                {/*    ) : '' : ''}*/}

                {/*</div>*/}
                <BottomNavigationBar userData={pageData ? pageData.data : []} deleteAll={e => handleDeleteGroup(e)}/>
            </div>

            <div className={"float-btn-add"} onClick={e => handleAddPage()}>
                <i className="bx bx-plus"></i>
            </div>

        </CHECK_BOX_CONTENT.Provider>
    )
}
let elements = document.getElementById("page_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<PageList {...props} />, elements);
}
