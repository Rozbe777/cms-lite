import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {TreeShowPage} from './../../_Micro/ContentComponents/TreeShowPage';
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import Loading from './../../_Micro/Loading'
import NotFound from './../../_Micro/NotFound'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast, successSwal, swalAccept} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import {Pagination} from "../../_Micro/Pagination";
import SearchComponent from "./../Search";
import ContentAdd from './../Component/ContentAdd';
import ContentApi from './../Api/ContentApi';


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

    let contentApi = new ContentApi();

    useEffect(() => {
        GetAllContents();
    }, [])

    const GetAllContents = (stringSearchs) => {
        setLoading(true);
        contentApi.setSearchElement(stringSearchs);
        contentApi.getAll().then(response => {
            setLoading(false);
            setContentData(response.data.data);
            setPerPage(response.data.data.per_page);
            setContentAll(response.data.data);
            setTotal(response.data.data.total);
        }).catch(err => {
            if (err.response.data.errors) {
                ErroHandle(err.response.data.errors);
            } else {
                $(".tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
    }



    const handleReload = (actionRes) => {
            GetAllContents();
            ReactDom.render('', document.getElementById('add-datas'))
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
            $("li.page-item.numberss." + pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 1);
        } else if (pageNumber == 1) {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss." + pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss." + pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 2);
            $("li.page-item.previous").css("opacity", 2);
        }
    };



    const searchResultSelected = (searchData) => {
        Object.keys(searchData).forEach((key, value) => {
            if (key === "pageSize") {
                if (!searchData[key]) {
                    stringSearchs.params.page = 1;
                    stringSearchs.params[key] = 15;
                } else {
                    stringSearchs.params.page = 1;
                    stringSearchs.params[key] = searchData[key];
                }
            } else {
                stringSearchs.params.page = 1;
                stringSearchs.params[key] = searchData[key];
            }
        })

        // go to first page in paginate
        $("li.page-item.numberss").removeClass("active");
        $("li.page-item").eq(1).addClass("active");
        $("li.page-item.next").css("opacity", 1);
        $("li.page-item.previous").css("opacity", 0.4);
        // end go to paginate

        stringSearchs.params.page = 1;
        GetAllContents(stringSearchs)
    }

    const onAddContent = (e) => {
        e.preventDefault();
        ReactDom.render(<ContentAdd actionResult={handleReload}/>, document.getElementById("add-datas"))
    }



    const multiContentDelete = (e) => {
        e.preventDefault();
        contentApi._contentId = checkBox;
        // show swal for get accept delete
        swalAccept(`حذف گروهی از محتواها`).then(resSwal => {
            if (resSwal.value) {
                contentApi.deleteContent().then(res => {
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

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" مورد انتخاب شده است "}
                                  deleteUsers={e => multiContentDelete(e)}
                                  allData={contentData.data ? contentData : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} icon={"bx bx-plus"} onClicked={onAddContent} data={breadData}/>
                </div>

                <SearchComponent searchResultSelected={searchResultSelected}/>

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


                <div className={"container-fluied"} style={{minHeight: '300px', padding: '0 20px', marginTop: 20}}>
                    <div className={"row"}>
                        {_renderContentList()}
                        {_renderPaginate()}
                    </div>
                </div>

                <div id={"add-datas"}></div>

                <BottomNavigationBar userData={contentData}/>
            </div>

            <div className={"float-btn-add"} onClick={e => onAddContent(e)}>
                <i className="bx bx-plus"></i>
            </div>


        </CHECK_BOX_CONTENT.Provider>
    )


    function _renderPaginate() {
        return (
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
        )
    }


    function _renderContentList() {
        if (loading === true) {
            return (<Loading/>)
        } else {
            if (contentData.data) {
                return (
                    <TreeShowPage
                        contentData={contentData}
                        loading={loading}
                        actionResult={handleReload}
                    />
                )
            } else {
                return (
                    <div style={{width: '100%'}}>
                        <NotFound/>
                        {stringSearchs ? '' : (
                            <div id={"maines"}>
                                <button id="add-page"
                                        onClick={e => onAddContent(e)}
                                        style={{width: 180}}
                                        className="btn btn-primary glow mr-1 mb-1"
                                        type="button">
                                    <span className="align-middle ml-25">افزودن محتوا </span>
                                </button>
                            </div>
                        )}

                    </div>
                )
            }
        }
    }

}
let elements = document.getElementById("content-manager");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<ContentList {...props} />, elements);
}
