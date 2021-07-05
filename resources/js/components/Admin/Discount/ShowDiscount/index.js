import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import {AddDiscount} from './../AddDiscount';
import {ItemDis} from "../layout/ItemDis";
import $ from "jquery";
import {Request} from "../../../../services/AdminService/Api";
import ReactDom from "react-dom";
import Loading from "../../_Micro/Loading";
import {CHECK_BOX_CONTENT} from './../../UserList/Helper/Context'
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import SearchComponent from "./../Search";

const Show = (props) => {
    let targetElem = document.getElementById("add-datas");
    const {token} = props;
    const [loading , setLoading] = useState(false)
    const [state, setState] = useState();
    const [allCoupon , setAllCoupon] = useState([]);
    const [checkBox, setCheckBox] = useState([]);
    const [stringSearchs, setStringSearch] = useState({
        page : 1
    });

    useEffect(() => {
        getAllCoupons();
        $("#breadCrumb").addClass("activeCrumb");
    }, [])


    const handleEditDis = (e , data) => {
        e.preventDefault();
        console.log(data , "########")
        ReactDOM.render(<AddDiscount token={token} result={handleBack} dataDefaul={data}/>, document.getElementById("add-datas"));
    }

    const getAllCoupons = (searchses) => {
        setLoading(true)
        Request.GetAllCoupon(searchses ? searchses : stringSearchs)
            .then(res => {
                setLoading(false)
                setAllCoupon(res.data)
            })
    }

    const [breadData] = useState({
        title: 'کد تخفیف',
        desc: 'نمایش لیست کد های تخفیف و مدیریت آنها'
    });


    $(function () {
        $("ul#menueeee li").mouseover(function () {
            $(this).find("ul").addClass("active");
        })
        $("ul#menueeee li").mouseout(function () {
            $(this).find("ul").removeClass("active");
        })
    })

    const handleBack = (item) => {
        if (item.status == 200) {
            getAllCoupons();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const handleAddDisc = e => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount token={token} result={handleBack}/>, document.getElementById("add-datas"));
    }

    const handleDeleteCoupon = (e , id) => {
        let finalAllIds = {};
        finalAllIds._token = token;
        finalAllIds.couponIds = checkBox;
        e.preventDefault();
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
                Request.DeleteCoupon(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'دسته بندی مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })


                        getAllCoupons();
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
        stringSearchs.page = pageNumber;
        setStringSearch({
            page: pageNumber

        });


        getAllCoupons(setStringSearch)

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
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div className={"row col-12"} id={"headerContent"}>
                <TotalActions text={" مورد انتخاب شده است "} deleteUsers={e => handleDeleteCoupon(e)}
                              allData={allCoupon} data={checkBox}/>
                <BreadCrumbs data={breadData} titleBtn={"ساخت کد تخفیف"} icon={"bx bx-plus"}
                             clicked={e => handleAddDisc(e)}/>
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

                getAllCoupons(stringed)
            }}
            />


            <div className={"container-fluid"}>

                <div className={"row"} style={{padding : '15px'}}>
                    {loading || !allCoupon.data ? (<Loading />) : allCoupon.data.map((item , index) => (
                        <div className={"col-lg-4 col-md-6 col-sm-12"} key={index} style={{padding : '5px'}}>
                            <ItemDis deleteCoupon={handleDeleteCoupon} handleEdit={handleEditDis} data={item} />
                        </div>
                    ))}

                </div>

            </div>

            <div id={"add-datas"}></div>
        </CHECK_BOX_CONTENT.Provider>
    )
}

export default Show;

let elem = document.getElementById("discount-page");
if (elem) {
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Show {...props} />, elem)
}
