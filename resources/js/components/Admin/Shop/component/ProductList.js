import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './../_shared/style.scss';
import './../_shared/Responsive.scss';
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from './../../UserList/Helper/Context'
import Item from './Item';
import Loading from "../../_Micro/Loading";
import SearchComponent from './../Search'
import {ErroHandle, error as ErrorToast, successSwal, swalAccept} from "../../../../helper";
import {Pagination} from "../../_Micro/Pagination";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import ReactDom from "react-dom";
import {NormalProductOneItem} from "../../Helper/HelperClassFetures";
import BottomNavigationBar from "../../UserList/HOC/BottomNavigationBar";
import ProductApi from './../Api/ProductApi'

const Index = () => {


    let productApi = new ProductApi();
    const [checked, setChecked] = useState([]);
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        data: []
    });
    const [perPage, setPerPage] = useState();
    const [total, setTotal] = useState();
    const [stringSearchs, setStringSearch] = useState({
        page: 1
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

        productApi._searchElements = dataSearch;
        productApi.getAll().then(res => {
            setProducts(res.data.data)
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

    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
    }


    const onAdd = e => {
        e.preventDefault();
        ReactDOM.render(<ProductAdd types={"add"} result={actionReload}/>, document.getElementById("add-product"));
    }

    const onEdit = (e, dataGet) => {
        e.preventDefault();
        let normalData = NormalProductOneItem(dataGet);
        ReactDOM.render(<ProductEdit defaultValuePro={normalData}
                                    result={actionReload}/>, document.getElementById("add-product"));
    }
    const onDuplicate = (e, data) => {
        e.preventDefault();
        let normalData = NormalProductOneItem(data)
        ReactDOM.render(<ProductAdd types={"duplicate"} defaultValuePro={normalData}
                                    result={actionReload}/>, document.getElementById("add-product"));
    }


    const paginate = (pageNumber) => {
        stringSearchs.page = pageNumber;
        setStringSearch({
            page: pageNumber

        });
        GetAllProducts(stringSearchs);
        $("li.page-item").removeClass("active");
        if (Math.ceil(total / perPage) == 1) {
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
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
        }

        $("li#" + pageNumber).addClass("active");
    };



    const actionReload = (e) => {
        e.preventDefault();
        GetAllProducts(stringSearchs);
        ReactDom.render('', document.getElementById('add-product'))

    }

    function searchResult(items) {
        setStringSearch(items)
        let stringed = {...stringSearchs};
        Object.keys(items).map(ii => {
            stringed[ii] = items[ii];
        })
        paginate(1)
        stringed.page = 1;
        setStringSearch(stringed)

        GetAllProducts(stringed)
    }

    function handleDeleteGroup(e, singleId) {
        e.preventDefault();
        productApi._productIds = singleId ? [singleId] : checkBox;
        // show swal for get accept delete
        swalAccept(`حذف از محصولات`).then(resSwal => {
            if (resSwal.value) {
                productApi.delete().then(res => {
                    successSwal("با موفقیت حذف شدند !");
                    $(".pagination li.page-item.numberss").removeClass("active")
                    $("ul.pagination li").eq(1).addClass("active")
                    $("span.checkboxeds").removeClass("active");

                    $("li.page-item.numberss").removeClass("active");
                    $("li.page-item").eq(1).addClass("active");
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);
                    setCheckBox([]);
                    actionReload(e);
                })
            }
        })
    }

    return (
        <>

            <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" محصول انتخاب شده است"} deleteUsers={e => handleDeleteGroup(e)}
                                  allData={products ? products : []} data={checkBox}/>
                    <BreadCrumbs titleBtn={"افزودن"} onClicked={e => onAdd(e)} icon={"bx-plus"}
                                 data={breadData}/>
                </div>


                <SearchComponent searchResult={searchResult}/>

                <div className={"container-fluid"} style={{marginTop: '20px', padding: '0px 4px'}}>
                    <div className={"row"} style={{padding: 10}}>

                        {!loading ?
                            products.data.length > 0 ?
                                products.data.map((item, index) => (<Item
                                        key={index} data={item}
                                        checkStateOfOut={checked}
                                        sizeOf={products.data.length}
                                        onEdit={onEdit}
                                        onDuplicate={onDuplicate}
                                        onDelete={handleDeleteGroup}
                                        checkBoxSelected={response => console.log("checked")}/>
                                ))
                                : // for empty product array
                                (
                                    <div id={"add-product-btn-box"}>
                                        <p>محصولی ثبت نشده است!</p>
                                        <button type={"button"} className={"btn btn-primary shadow mr-1 mb-1"}
                                                onClick={e => console.log("adding")}>
                                            افزودن محصول
                                        </button>
                                    </div>
                                )
                            : (<Loading/>)}


                        <div className="col-md-12">
                            {products.data ? products.data.length ? (
                                <Pagination
                                    firstPageUrl={products.first_page_url}
                                    lastPageUrl={products.last_page_url}
                                    currentPage={products.cuerrent_page}
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


                <BottomNavigationBar userData={products} deleteAll={e => handleDeleteGroup(e)}/>

            </CHECK_BOX_CONTENT.Provider>

        </>
    )


}

export default Index;

let eleman = document.getElementById("shop_product_manager");
if (eleman) {
    ReactDOM.render(<Index/>, eleman)
}
