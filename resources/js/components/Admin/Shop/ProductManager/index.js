import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import './_Shared/Responsive.scss';
import ProductAdd from './../ProductAdd';
import {Request} from "../../../../services/AdminService/Api";
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from './../../UserList/Helper/Context'
import Item from './Item';
import Loading from "../../_Micro/Loading";
import SearchComponent from './../Search'
import DataInitial from '../InitialData.js';
import GroupAction from "../GroupAction";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {Pagination} from "../../_Micro/Pagination";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import ReactDom from "react-dom";
import {NormalProductOneItem} from "../../Helper/HelperClassFetures";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";

const Index = () => {
    const [checked, setChecked] = useState([]);
    const [checkBox, setCheckBox] = useState([]);
    const [chipset, setChipset] = useState([]);
    const [search, setSearch] = useState(false)
    const [stateOf, setStateOf] = useState();
    const [loading, setLoading] = useState(false);
    const [Products, setProducts] = useState({
        data: []
    });
    const [perPage, setPerPage] = useState();
    const [total, setTotal] = useState();
    const [edit, setEdit] = useState(false);
    const [stringSearchs, setStringSearch] = useState({
        page : 1
    });

    const [breadData] = useState({
        title: 'لیست محصولات',
        desc: 'نمایش لیست محصولات و مدیریت آن ها'
    });

    useEffect(() => {
        GetAllProducts()
    }, [])




    const GetAllProducts = (dataSearch) => {
        setLoading(true);
        Request.GetAllProducts(dataSearch).then(res => {
            setProducts(res.data.data)
            console.log("//////++++++" , res.data.data.data)
            setPerPage(res.data.data.per_page);
            setTotal(res.data.data.total);
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

    const handleInput = (e) => {

    }

    const handleSwitchStatus = () => {

    }


    const handleDeleteGroup = (event , idOne = null) => {


        console.log("dataa_____", checkBox)

        let finalAllIds = {};

        idOne ? finalAllIds.productIds = [idOne] : finalAllIds.productIds = checkBox;


        finalAllIds._token = $('meta[name="csrf-token"]').attr('content');

        event.preventDefault();
        swal({
            title: 'حذف محصول',
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
                Request.GroupDelProduct(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'محصول مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                        stringSearchs.page = 1;

                        GetAllProducts(stringSearchs);
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


    const handleCheckAll = (idArray) => {
        setChecked(idArray);
    }


    // window.onscroll = function () {
    //     scrollFunction()
    // };

    // function scrollFunction() {
    //     if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    //         $("#actionGroup").addClass("scrolls");
    //     } else {
    //         $("#actionGroup").removeClass("scrolls");
    //
    //     }
    // }


    const handleBackRef = (item) => {
        console.log("...@@@@" , item)
        if (item.status == 200) {
            GetAllProducts(stringSearchs);
            ReactDom.render('', document.getElementById('add-product'))
        }
    }

    const HandlePopUpAddProduct = e => {
        e.preventDefault();
        ReactDOM.render(<ProductAdd result={res => handleBackRef(res) }/>, document.getElementById("add-product"));
    }

    const HandleEdit = (e , data) => {
        e.preventDefault();
        let normalData = NormalProductOneItem(data)
        ReactDOM.render(<ProductAdd types={"edit"} defaultValuePro={normalData} result={res => handleBackRef(res) }/>, document.getElementById("add-product"));
    }
    const HandleDuplicate = (e , data) => {
        e.preventDefault();
        let normalData = NormalProductOneItem(data)
        ReactDOM.render(<ProductAdd types={"duplicate"} defaultValuePro={normalData} result={res => handleBackRef(res) }/>, document.getElementById("add-product"));
    }


    const paginate = (pageNumber) => {
        // let pagess = stringSearchs ? "page=" + pageNumber + "&" + stringSearchs : "page=" + pageNumber;

        stringSearchs.page = pageNumber;
        setStringSearch({
                page: pageNumber

        });

        GetAllProducts(stringSearchs);
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


            <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" محصول انتخاب شده است "} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={Products ? Products : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} clicked={e => HandlePopUpAddProduct(e)} icon={"bx-plus"}
                                 data={breadData}/>
                </div>


                <SearchComponent sort={items => {
                    setStringSearch(items)
                    let stringed = {...stringSearchs};
                    Object.keys(items).map(ii => {
                        stringed[ii] = items[ii];
                    })
                    paginate(1)
                    stringed.page = 1;
                    setStringSearch(stringed)

                    console.log("@@@@@@ " ,stringed)
                    GetAllProducts(stringed)
                }}
                />

                <div className={"container-fluid"} style={{marginTop: '20px', padding: '0px 4px'}}>
                    <div className={"row"} style={{padding: 10}}>
                        {loading === false ? Products.data.length > 0 ? Products.data.map(item => {
                            return (
                                <Item data={item} checkStateOfOut={checked} sizeOf={Products.data.length}
                                      editClick={e => HandleEdit(e, item)}
                                      duplicated={e=> HandleDuplicate(e , item)}
                                      deleteClick={e => {
                                          handleDeleteGroup(e.event , e.id)
                                      }}
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
                            {Products.data ? Products.data.length ? (
                                <Pagination
                                    firstPageUrl={Products.first_page_url}
                                    lastPageUrl={Products.last_page_url}
                                    currentPage={Products.cuerrent_page}
                                    perPage={perPage}
                                    // users={allU/ser}
                                    total={total}
                                    paginate={paginate}
                                />
                            ) : '' : ''}

                        </div>

                    </div>

                </div>
                <div id={"add-product"}>
                </div>


                <BottomNavigationBar userData={Products} deleteAll={e => handleDeleteGroup(e)}/>

            </CHECK_BOX_CONTENT.Provider>

        </>
    )
}

export default Index;

let eleman = document.getElementById("shop_product_manager");
if (eleman) {
    ReactDOM.render(<Index/>, eleman)
}
