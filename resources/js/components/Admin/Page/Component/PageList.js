import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {TreeShowPage} from "../../_Micro/PageComponents/TreeShowPage";
import './../../_Micro/TreeShow/_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import Loading from './../../_Micro/Loading';
import $ from 'jquery';
import {ErroHandle, error as ErrorToast, successSwal, swalAccept} from "../../../../helper";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import PageAdd from "./PageAdd";
import PageApi from "../Api/PageApi";

export const PageList = ({token}) => {
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageData, setPageData] = useState([])
    const [breadData] = useState({
        title: 'لیست صفحه ها',
        desc: 'نمایش لیست صفحه ها و مدیریت آنها'
    });


    let pageApi = new PageApi();
    const getAllPage = () => {
        setLoading(true);
        pageApi.call().then(response => {
            setLoading(false);
            setPageData(response.data);
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
        getAllPage();

    }, [])


    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }

    const multiPageDelete = (e , singleId) => {
        e.preventDefault();
        pageApi.pageIds(singleId ? [singleId] : checkBox);
        // show swal for get accept delete
        swalAccept(`حذف از دسته بندی ها`).then(resSwal => {
            if (resSwal.value) {
                pageApi.delete().then(res => {
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
        getAllPage();
        ReactDom.render('', document.getElementById('add-datas'))
    }

    const onAddPage = (e) => {
        e.preventDefault();
        ReactDom.render(<PageAdd actionResult={handleReload} pageData={''} allPageData={pageData}/>, document.getElementById("add-datas"))
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
                    <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => multiPageDelete(e)}
                                  allData={pageData} data={checkBox}/>
                    <BreadCrumbs data={breadData} titleBtn={"افزودن"} icon={"bx bx-plus"}
                                 onClicked={onAddPage}/>
                </div>


                <div className="tab-content" style={{padding: 0}}>
                    <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">
                        {_renderPageList()}
                    </div>


                </div>


                <div id={"add-datas"}></div>
                <BottomNavigationBar userData={pageData} deleteAll={e => multiPageDelete(e)}/>

            </div>

            <div className={"float-btn-add"} onClick={e => onAddPage(e)}>
                <i className="bx bx-plus"></i>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )

    function _renderPageList() {
        if (loading === true) {
            return (<Loading/>)
        } else {
            if (pageData.data) {
                return (
                    <TreeShowPage
                        pageData={pageData}
                        loading={loading}
                        multiPageDelete={multiPageDelete}
                        actionResult={handleReload}
                    />
                )
            } else {
                return (
                    <div style={{width: '100%'}}>
                        <div id={"maines"}>
                            <button id="add-page"
                                    onClick={e => onAddPage(e)}
                                    style={{width: 180}}
                                    className="btn btn-primary glow mr-1 mb-1"
                                    type="button">
                                <span className="align-middle ml-25">افزودن صفحه </span>
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }
}
let elements = document.getElementById("page_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<PageList {...props} />, elements);
}
