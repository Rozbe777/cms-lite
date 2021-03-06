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
import {CHECK_BOX_CONTENT, CHECK_RESULT} from './../../UserList/Helper/Context'
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import SearchComponent from "./../Search";
import {Pagination} from "../../_Micro/Pagination";

const Show = (props) => {
    let targetElem = document.getElementById("add-datas");
    const {token} = props;
    const [loading, setLoading] = useState(false);
    const [loadingOne, setLoadingOne] = useState(false);
    const [state, setState] = useState();
    const [perPage, setPerPage] = useState();
    const [allCoupon, setAllCoupon] = useState([]);
    const [total, setTotal] = useState();
    const [checkBox, setCheckBox] = useState([]);
    const [result, setResult] = useState('')
    const [stringSearchs, setStringSearch] = useState({
        page: 1
    });
    const [oneCoupon, setOneCoupon] = useState({});
    const [checked, setChecked] = useState([]);


    useEffect(() => {
        getAllCoupons();
        $("#breadCrumb").addClass("activeCrumb");

    }, [])


    const backcheck = (state) => {
        if(state){
            getAllCoupons();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const handleShowDis = (e, data) => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount token={token} backcheck={backcheck} dataDefaul={data}
                                     />, document.getElementById("add-datas"));
    }

    const handleEditDis = (e, id) => {
        e.preventDefault();
        setLoadingOne(true);
        Request.GetOneCoupon(id)
            .then(res => {
                setLoadingOne(false);
                setOneCoupon(res.data.data);
                handleShowDis(e , res.data.data)
            }).catch(err => {
            setLoadingOne(false)
            if (err.response.data.errors) {
                ErroHandle(err.response.data.errors);
            } else {
                //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>???????????? ????????</button>
                $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>?????? ???? ???????????? ???? ??????????????</p><p>?????????? ???????? ????????</p><div>");
                ErrorToast("???????? ?????? ???????????? ???? ???? ???????? ??????")
            }
        })
    }

    const getAllCoupons = (searchses) => {
        setLoading(true)
        Request.GetAllCoupon(searchses ? searchses : stringSearchs)
            .then(res => {
                setLoading(false)
                setAllCoupon(res.data)
                setPerPage(res.data.per_page);
                setTotal(res.data.total)
            }).catch(err => {
            if (err.response.data.errors) {
                ErroHandle(err.response.data.errors);
            } else {
                //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>???????????? ????????</button>
                $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>?????? ???? ???????????? ???? ??????????????</p><p>?????????? ???????? ????????</p><div>");
                ErrorToast("???????? ?????? ???????????? ???? ???? ???????? ??????")
            }
        })
    }

    const [breadData] = useState({
        title: '???? ??????????',
        desc: '?????????? ???????? ???? ?????? ?????????? ?? ???????????? ????????'
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

        if (item.http_code == 200) {
            getAllCoupons();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }


    const handleBackUpdate = (item) => {
        if (item.http_code == 200) {
            getAllCoupons();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }

    const handleAddDisc = e => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount token={token} pushRes={e => handleBackUpdate(e)}
                                     results={handleBack}/>, document.getElementById("add-datas"));
    }

    const handleDeleteCoupon = (e, id) => {
        let finalAllIds = {};
        finalAllIds._token = token;
        if (id) {
            finalAllIds.couponIds = [id];
        } else {
            finalAllIds.couponIds = checkBox;
        }
        e.preventDefault();
        swal({
            title: '?????? ????????',
            text: "?????? ????????????????",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '??????????',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: '????????????',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.DeleteCoupon(finalAllIds)
                    .then(res => {
                        setCheckBox([])
                        Swal.fire({
                            type: "success",
                            title: '?????? ????!',
                            text: '???????? ???????? ?????? ?????? ????',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: '????????',
                        })


                        getAllCoupons();
                    }).catch(error => {
                    if (error.response.data.errors) {
                        ErroHandle(error.response.data.errors)
                    } else {
                        ErrorToast("???????? ?????? ???????????? ???? ???? ???????? ??????")
                    }
                })
            }
        });
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


    if (checkBox.length > 0) {
        $("#totalAction").addClass("activeAction");
        $("#breadCrumb").removeClass("activeCrumb");
    } else {
        $("#totalAction").removeClass("activeAction");
        $("#breadCrumb").addClass("activeCrumb");
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
            <CHECK_RESULT.Provider value={{setResult}}>

                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions text={" ???????? ???????????? ?????? ?????? "} deleteUsers={e => handleDeleteCoupon(e)}
                                  allData={allCoupon} data={checkBox}/>
                    <BreadCrumbs data={breadData} titleBtn={"???????? ???? ??????????"} icon={"bx bx-plus"}
                                 clicked={e => handleAddDisc(e)}/>
                </div>


                <SearchComponent sort={items => {
                    setStringSearch(items)
                    let stringed = {...stringSearchs};
                    Object.keys(items).map(ii => {
                        stringed[ii] = items[ii];
                    })
                    setStringSearch(stringed)

                    getAllCoupons(stringed)
                }}
                />


                <div className={"container-fluid"}>

                    <div className={"row"} style={{marginTop: '-15px'}}>
                        {loading || !allCoupon.data ? (<Loading/>) : allCoupon.data.map((item, index) => (
                            <div className={"col-lg-3 col-md-4 col-sm-12"} id={"coupon-box"} key={index}
                                 style={{padding: '8px !important'}}>
                                <ItemDis handleCheck={HandleChecked} handleDelete={handleDeleteCoupon}
                                         sizeOf={allCoupon.data.length} checkStateOfOut={checked}
                                         deleteCoupon={handleDeleteCoupon} handleEdit={handleEditDis} data={item}/>
                            </div>
                        ))}
                    </div>

                    {loadingOne ? (
                        <div className={"backLoadings"} style={{display: 'block'}}>
                            <div className="spinner-border spinner-border-lg text-info" id={"loading-load"}
                                 role="status">
                                <span className="sr-only">???? ?????? ???????????????? ...</span>
                            </div>
                        </div>
                    ) : ''}

                </div>

                <div id={"add-datas"}></div>
            </CHECK_RESULT.Provider>
        </CHECK_BOX_CONTENT.Provider>
    )
}

export default Show;

let elem = document.getElementById("discount-page");
if (elem) {
    const props = Object.assign({}, elem.dataset);
    ReactDOM.render(<Show {...props} />, elem)
}
