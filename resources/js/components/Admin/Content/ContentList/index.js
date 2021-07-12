import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowPage} from './../../_Micro/ContentComponents/TreeShowPage';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
// import ContentAdd from './../../Content/ContentAdd'
import Loading from './../../_Micro/Loading'
import NotFound from './../../_Micro/NotFound'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import {Pagination} from "../../_Micro/Pagination";
import SearchComponent from "./../Search";
import ContentAdd from './../Component/ContentAdd';
import {HandleDeleteGroup} from "../Helper/Action";


export const ContentList = ({token}) => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [contentData, setContentData] = useState({})
    const [contentAll, setContentAll] = useState({})
    const [perPage, setPerPage] = useState(0);
    const [total, setTotal] = useState();
    const [breadData] = useState({
        title: 'لیست محتوا',
        desc: 'نمایش لیست محتوا و مدیریت آنها'
    });
    const [stringSearchs, setStringSearch] = useState({
        params: {
            page: 1
        }
    });

    const [reloadTag, setReloadTag] = useState(false);

    const GetAllContents = (stringSearchs) => {
        setLoading(true)
        Request.GetAllContents(stringSearchs)
            .then(res => {
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
        ReactDom.render(<ContentAdd  actionResult={handleReload} />, document.getElementById("add-datas"))
    }

    const HandleDuplicate = (status) => {
        if (status == 200) {
            GetAllContents();
        } else {
        }
    }

    const handleReload = (actionRes) => {
        if (actionRes.status === 200){
            GetAllContents();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const HandleAddContentSelect = (data) => {
        handleAddContent();
    }

    const handleClickItemContent = (clickId) => {
        ReactDom.render(<ContentAdd token={token} display={true} idParent={clickId}
                                    dataUpdate={''}
                                    actionResult={handleReload}
                                    />, document.getElementById("add-datas"))
    }
    const HandleDeleteContent = (status) => {
        if (status == 200) {
            $(".pagination li.page-item.numberss").removeClass("active")
            $("ul.pagination li").eq(1).addClass("active")
            $("span.checkboxeds").removeClass("active");

            $("li.page-item.numberss").removeClass("active");
            $("li.page-item").eq(1).addClass("active");
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
            GetAllContents();
        } else {
        }
    }
    const HandleBackLoaderContent = (data) => {
        ReactDom.render(<ContentAdd token={token} display={true} dataUpdate={data} idParent={0} actionResult={handleReload}
                                   />, document.getElementById("add-datas"))
    }

    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }

    const paginate = (pageNumber) => {
        stringSearchs.params.page = pageNumber;
        setStringSearch({
            params: {
                page: pageNumber
            }
        });
        $(".backLoadings").fadeIn();
        GetAllContents(stringSearchs);
        if (pageNumber == Math.ceil(total / perPage)) {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss."+pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 1);
        } else if (pageNumber == 1) {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss."+pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss."+pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 2);
            $("li.page-item.previous").css("opacity", 2);
        }
    };


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => HandleDeleteGroup(e , checkBox ,setCheckBox, handleReload , GetAllContents ,stringSearchs )}
                                  allData={contentData.data ? contentData : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} icon={"bx bx-plus"} data={breadData}/>
                </div>

                <SearchComponent total={total} tagReload={reloadTag} searchRes={items => {
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


                    $("li.page-item.numberss").removeClass("active");
                    $("li.page-item").eq(1).addClass("active");
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);

                    stringSearchs.params.page = 1;
                    GetAllContents(stringSearchs)
                }}/>

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


                <div className={"container-fluied"} style={{minHeight: '300px', padding: '0 20px' , marginTop:20}}>
                    <div className={"row"}>

                        {loading === false && contentData.data ? contentData.data.length > 0 ? (
                            <TreeShowPage
                                          duplicate={item => HandleDuplicate(item)}
                                          itemClicks={clicks => handleClickItemContent(clicks)}
                                          callBack={item => HandleDeleteContent(item)}
                                          delClick={item => HandleDeleteContent(item)}
                                          updateData={item => HandleBackLoaderContent(item)}
                                          data={contentData}
                                          loading={loading}/>
                        ) : (
                            <div style={{width: '100%'}}>
                                <NotFound/>
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

                <BottomNavigationBar userData={contentData} deleteAll={e => handleDeleteGroup(e)}/>
            </div>

            <div className={"float-btn-add"} onClick={e => handleAddContent()}>
                <i className="bx bx-plus"></i>
            </div>


        </CHECK_BOX_CONTENT.Provider>
    )
}
let elements = document.getElementById("content-manager");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<ContentList {...props} />, elements);
}
