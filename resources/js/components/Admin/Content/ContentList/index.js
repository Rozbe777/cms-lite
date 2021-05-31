import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowPage} from './../../_Micro/ContentComponents/TreeShowPage';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import ContentAdd from './../../Content/ContentAdd'
import Loading from './../../_Micro/Loading'
import NotFound from './../../_Micro/NotFound'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import {Pagination} from "../../_Micro/Pagination";
import SearchComponent from "./../Search";

const LOCAL_CAT = "localcat-zerone-cmslite";

export const ContentList = () => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState()
    const [contentData, setContentData] = useState({})
    const [contentAll, setContentAll] = useState({})
    const [searchload, setSearch] = useState(false)

    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState();


    const [length, setLength] = useState(0)
    const [breadData] = useState({
        title: 'لیست محتوا',
        desc: 'نمایش لیست محتوا و مدیریت آنها'
    });
    const [stringSearchs, setStringSearch] = useState({
        params: {
            page: 1
        }

    });


    const GetAllContents = (stringSearchs) => {
        setLoading(true)
        Request.GetAllContents(stringSearchs)
            .then(res => {
                console.log("resultttttt : " , res)
                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setContentData(res.data.data)
                setPerPage(res.data.data.per_page);
                setContentAll(res.data.data)
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
        GetAllContents();
        $(function () {
            $("#show-loader-selected").click(() => {
                handleAddContent();
            })
        })
    }, [])

    const handleAddContent = () => {
        ReactDom.render(<ContentAdd display={true} dataUpdate={''} idParent={0}
                                    result={item => handleBackContent(item)}/>, document.getElementById("add-datas"))
    }


    const HandleAdd = (item) => {
        if (item.status == 200) {
            GetAllContents();
            ReactDom.render('', document.getElementById("add-datas"))
        } else {
            console.log("error in add : ", item)
        }
    }

    const HandleDelete = (status) => {
        GetAllContents();

        setCheckBox([])
    }

    const HandleDuplicate = (status) => {
        if (status == 200) {
            GetAllContents();
        } else {
            console.log("you have an error");
        }
    }


    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllContents();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }
    const handleBackContent = (item) => {
        if (item.status == 200) {
            GetAllContents();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    const HandleAddContentSelect = (data) => {
        handleAddContent();
    }

    // Content handlersssss
    const HandleDuplicateContent = (status) => {
        if (status == 200) {
            GetAllContents();
        } else {
            console.log("you have an error");
        }
    }
    const handleClickItemContent = (clickId) => {
        ReactDom.render(<ContentAdd display={true} idParent={clickId}
                                    dataUpdate={''}
                                    result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }
    const HandleDeleteContent = (status) => {
        if (status == 200) {
            GetAllContents();
        } else {
            console.log("you have an error");
        }
    }
    const HandleBackLoaderContent = (data) => {
        ReactDom.render(<ContentAdd display={true} dataUpdate={data} idParent={0}
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

        let finalAllIds = {};
        finalAllIds.contentIds = checkBox;

        finalAllIds._token = $('meta[name="csrf-token"]').attr('content');

        event.preventDefault();
        swal({
            title: 'حذف محتوا',
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
                Request.GroupDelContent(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'محتوا مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                        stringSearchs.params.Content = 1;

                        GetAllContents(stringSearchs);
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
        // let pagess = stringSearchs ? "page=" + pageNumber + "&" + stringSearchs : "page=" + pageNumber;
        stringSearchs.params.page = pageNumber;
        setStringSearch({
            params: {
                page: pageNumber
            }
        });

        GetAllContents(stringSearchs);
        $("li.page-item").removeClass("active");
        if (pageNumber == Math.ceil(total / perPage)) {
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 1);
        } else if (pageNumber == 1) {
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
            $("li.page-item.next").css("opacity", 2);
            $("li.page-item.previous").css("opacity", 2);
        }
        $("li#" + pageNumber).addClass("active");
    };


    console.log("checkkkkk ,", checkBox)

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <div className={"row col-12"} id={"headerContent"}>
                    {console.log("...................////" , contentData)}
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={contentData.data ? contentData : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} icon={"bx bx-plus"} data={breadData}/>
                </div>


                <SearchComponent total={total} searchRes={items => {
                    Object.keys(items).forEach((key, value) => {
                        setSearch(true)
                        if (key === "pageSize") {
                            if (!items[key]) {
                                stringSearchs.params.page = 1;
                                stringSearchs.params[key] = 15;
                            } else {
                                stringSearchs.params.page = 1;
                                stringSearchs.params[key] = items[key];
                            }


                        } else {
                            stringSearchs.params.page = 1;
                            stringSearchs.params[key] = items[key];
                        }

                    })
                    stringSearchs.params.page = 1;
                    GetAllContents(stringSearchs)
                }}/>

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


                <div className={"container-fluied"} style={{minHeight : '300px' , padding : '0 20px'}}>
                    <div className={"row"}>

                        {loading === false && contentData.data ? contentData.data.length > 0 ? (
                            <TreeShowPage handleCata={itemCat => console.log("cat back ,", itemCat)}
                                          duplicate={item => HandleDuplicate(item)}
                                          itemClicks={clicks => handleClickItemContent(clicks)}
                                          callBack={item => HandleDeleteContent(item)}
                                          delClick={item => HandleDeleteContent(item)}
                                          updateData={item => HandleBackLoaderContent(item)}
                                          data={contentData}
                                          loading={loading}/>
                        ) : (
                            <div style={{width : '100%'}}>
                               <NotFound />
                                {stringSearchs ? '' : (
                                    <div id={"maines"}>
                                        <button id="add-page"
                                                onClick={() => handleAddContent()}
                                                style={{width: 180}}
                                                className="btn btn-primary glow mr-1 mb-1"
                                                type="button">
                                            <span className="align-middle ml-25">افزودن محتوا </span>
                                        </button>
                                    </div>
                                )}

                            </div>
                        ) : <Loading/>}


                        <div className="col-md-12">
                            {console.log("_____" , contentData)}
                            {contentData.data ? contentData.data.length ? (
                                <Pagination
                                    firstPageUrl={contentData.first_page_url}
                                    lastPageUrl={contentData.last_page_url}
                                    currentPage={contentData.cuerrent_page}
                                    perPage={perPage}
                                    users={contentAll}
                                    total={total}
                                    paginate={paginate}
                                />
                            ) : '' : ''}

                        </div>

                    </div>
                </div>

                <BackLoader states={item => (HandleAddContentSelect(item))}/>
                <div id={"add-datas"}></div>

                <BottomNavigationBar userData={categoryData} deleteAll={e => handleDeleteGroup(e)}/>
            </div>


        </CHECK_BOX_CONTENT.Provider>
    )
}
let elements = document.getElementById("content-manager");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<ContentList {...props} />, elements);
}
