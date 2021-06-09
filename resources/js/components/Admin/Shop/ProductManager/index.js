import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import './_Shared/Responsive.scss';
import ProductAdd from './../ProductAdd';
import {Request} from "../../../../services/AdminService/Api";
import $ from 'jquery';
import Item from './Item';
import Loading from "../../_Micro/Loading";
import SearchComponent from './../Search'
import DataInitial from '../InitialData.js';
import GroupAction from "../GroupAction";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {Pagination} from "../../_Micro/Pagination";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";

const Index = () => {
    const [checked, setChecked] = useState([]);
    const [checkBox, setCheckBox] = useState([]);
    const [chipset, setChipset] = useState([]);
    const [stateOf, setStateOf] = useState();
    const [loading, setLoading] = useState(false);
    const [contentData, setContentData] = useState();
    const [contentNew, setContentNew] = useState([]);
    const [perPage, setPerPage] = useState();
    const [total, setTotal] = useState();
    const [allUser, setAllUser] = useState();
    const [edit, setEdit] = useState(false);
    const [stringSearchs, setStringSearch] = useState({
        params: {
            page: 1
        }

    });

    const [breadData] = useState({
        title: 'لیست محصولات',
        desc: 'نمایش لیست محصولات و مدیریت آن ها'
    });

    useEffect(() => {
        GetAllContentsAction()
    }, [])


    const GetAllContentsAction = () => {
        setLoading(true);
        Request.GetAllContents().then(res => {
            // console.log("res" , res.data.data.data)
            setContentNew(res.data.data.data)
            setContentData(res.data.data);
            setPerPage(res.data.data.per_page);
            setTotal(res.data.data.total);
            setAllUser(res.data.data.data);
            setLoading(false)

        }).catch(err => {
            if (err.response.data.errors) {
                ErroHandle(err.response.data.errors);
            } else {
                //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                // $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                ErrorToast("خطای غیر منتظره ای رخ داده است")
            }
        })
    }


// for show component action or search element by animate
    $(function () {
        var element = $("#actionGroup");
        if (checked.length > 0) {
            element.addClass("actived")
        } else {
            element.removeClass("actived")
        }
    })

    const HandleMakeName = () => {

    }

    const handleInput = (e) => {

    }

    const handleSwitchStatus = () => {

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


    const HandleChecked = (data) => {

        let checkedNew = [...checked];
        if (data.type == "added") {
            checkedNew.push(data.id);
        } else {
            var index = checkedNew.indexOf(data.id);
            checkedNew.splice(index, 1);
        }
        setChecked(checkedNew);

    }

    const handleAddChip = (item) => {
        let chipsets = [...chipset];
        chipsets.push(item);
        setChipset(chipsets);
    }

    const RemoveChipset = (name) => {
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
        }
    }
    let dataUpdateParse = useState({
        status: true
    });


    // search by element
    const HandleSearchCategory = (input) => {

    }


    const handleCheckAll = (idArray) => {

        setChecked(idArray);
    }


    window.onscroll = function () {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            $("#actionGroup").addClass("scrolls");
        } else {
            $("#actionGroup").removeClass("scrolls");

        }
    }

    $("")

    const HandlePopUpAddProduct = e => {
        e.preventDefault();
        ReactDOM.render(<ProductAdd/>, document.getElementById("add-product"));
    }


    const paginate = (pageNumber) => {
        // let pagess = stringSearchs ? "page=" + pageNumber + "&" + stringSearchs : "page=" + pageNumber;

        stringSearchs.params.page = pageNumber;
        setStringSearch({
            params: {
                page: pageNumber
            }
        });

        GetAllContentsAction(stringSearchs);
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


    return (
        <>
            {/*<div id={"actionGroup"} className={"actived"}>*/}
            {/*    <GroupAction data={checked} allProduct={DataInitial.Products} newCheck={item => handleCheckAll(item)}/>*/}
            {/*</div>*/}


            <div className={"row col-12"} id={"headerContent"}>
                <TotalActions deleteUsers={e => handleDeleteGroup(e)} allData={contentNew} data={checkBox}/>
                <BreadCrumbs titleBtn={"افزودن"} clicked={e => HandlePopUpAddProduct(e)} icon={"bx-plus"}
                             data={breadData}/>
            </div>


            <SearchComponent category={itemCat => HandleSearchCategory(itemCat)}/>

            <div className={"container-fluid"} style={{marginTop: '20px' , padding : '0px 4px'}}>
                <div className={"row"} style={{padding: 10}}>
                    {loading === false ? contentNew.length > 0 ? contentNew.map(item => {
                        return (
                            <Item data={item} checkStateOfOut={checked} sizeOf={DataInitial.Products.length}
                                  selected={response => HandleChecked(response)}/>
                        )
                    }) : (
                        <div id={"add-product-btn-box"}>
                            <p>محصولی ثبت نشده است!</p>
                            <button type={"button"} className={"btn btn-primary shadow mr-1 mb-1"}
                                    onClick={e => HandlePopUpAddProduct(e)}>
                                افزودن محصول
                            </button>
                        </div>
                    ) : (<Loading/>)}


                    <div className="col-md-12">
                        {/*{contentData.data ? contentData.data.length ? (*/}
                        {/*    <Pagination*/}
                        {/*        firstPageUrl={contentData.first_page_url}*/}
                        {/*        lastPageUrl={contentData.last_page_url}*/}
                        {/*        currentPage={contentData.cuerrent_page}*/}
                        {/*        perPage={perPage}*/}
                        {/*        users={allUser}*/}
                        {/*        total={total}*/}
                        {/*        paginate={paginate}*/}
                        {/*    />*/}
                        {/*) : '' : ''}*/}

                    </div>

                </div>

            </div>
            <div id={"add-product"}>
            </div>


        </>
    )
}

export default Index;

let eleman = document.getElementById("shop_product_manager");
if (eleman) {
    ReactDOM.render(<Index/>, eleman)
}
