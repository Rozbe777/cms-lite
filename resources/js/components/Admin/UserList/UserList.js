import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './../_Shared/Style.scss';
import {Request} from "./../../../services/AdminService/Api";
import {Pagination} from './../_Micro/Pagination';
import {Item} from './HOC/Item'
import $ from 'jquery';
import {TotalActions} from './HOC/TotalActions'
import Loading from './../_Micro/Loading'
import NotFound from './../_Micro/NotFound'
import SearchComponent from "./Search";
import {BreadCrumbs} from './HOC/BreadCrumbs'
import {CHECK_BOX_CONTENT} from "./Helper/Context";
import BottomNavigationBar from './HOC/BottomNavigationBar'
import './../Shop/ProductManager/_Shared/Responsive.scss'
import {ErroHandle, error as ErrorToast} from "../../../helper";

const UserList = memo((props) => {
    const {token} = props;
    const [name, setName] = useState();
    const [searchload, setSearch] = useState(false)
    const [allUser, setAllUser] = useState([]);
    const [userSelected, setUserSelected] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState();
    const [finalAllIds] = useState({userIds: []});
    const [checkBox, setCheckBox] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stringSearchs, setStringSearch] = useState({
        params: {
            page: 1
        }

    });
    const [userId, setUserId] = useState({userIds: []});
    const [breadData] = useState({
        title: 'لیست کاربران',
        desc: 'نمایش لیست کاربران و مدیریت آنها'
    });
    let userIdArr = [];

    let GetAllUser = (datass) => {


        setLoading(true);
        Request.GetAllUserApi(datass)
            .then(res => {
                $(".backLoadings").fadeOut();
                $("html, body").animate({scrollTop: 0}, 700);




                setLoading(false)
                setUserData(res.data.data);
                setPerPage(res.data.data.per_page);
                setTotal(res.data.data.total);
                setAllUser(res.data.data.data);


            }).catch(err => {
            ErrorToast("خطای غیر منتظره ای رخ داده است")
        })
    }


    let userEmpty = [];
    $(function () {


        $("#checkAll").change(function () {
            let status = $(this).prop("checked");
            if (status) {
                setUserId({
                    userIds: userIdArr
                })
            } else {
                setUserId({
                    userIds: []
                })
            }

            $(".checkItem").prop("checked", $(this).prop("checked"));

        })

        $(".checkItem").change(function () {
            if ($(this).prop("checked") == "false") {
                $("#checkAll").prop("checked", false);
            }
            if ($(".checkItem:checked").length == $(".checkItem").length) {
                $("#checkAll").prop("checked", true)
            }
        })
    })

    useEffect(() => {
        if (userId.userIds.length > 0) {
            $("#edit-boxes").fadeIn(0);
        } else {
            $("#edit-boxes").fadeOut(0);
        }

        // let pages = stringSearchs ? "page=1&" + stringSearchs : "page=1";
        GetAllUser(stringSearchs);

    }, [])

    userIdArr = userId.userIds;
    let selectHandler = (id) => {
        let filtered = userIdArr.includes(id);
        if (filtered) {
            var index = userIdArr.indexOf(id)
            if (index !== -1) {
                userIdArr.splice(index, 1);
                userIds.userIds = userIdArr;
            }
        } else {
            userIdArr[userIdArr.length] = id;
            let UserIds = {...userId};
            UserIds.userIds = userIdArr;
        }
    }

    const addAll = (data) => {
        userIdArr = [];
        data.map(col => {
            userIdArr[userIdArr.length] = col.id
        })
    }

    const indexOfLastUser = currentPage * perPage;
    const indexOfFirstUser = indexOfLastUser - perPage;
    const currentUsers = allUser.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => {
        stringSearchs.params.page = pageNumber;
        setStringSearch({
            params: {
                page: pageNumber
            }
        });
        $(".backLoadings").fadeIn();
        GetAllUser(stringSearchs);
        if (pageNumber == Math.ceil(total / perPage)) {
            $("li.page-item.next").css("opacity", 0.4);
            $("li.page-item.previous").css("opacity", 1);
        } else if (pageNumber == 1) {
            $("li.page-item.numberss").removeClass("active");
            $("li.page-item.numberss."+pageNumber).addClass("active");
            $("li.page-item.next").css("opacity", 1);
            $("li.page-item.previous").css("opacity", 0.4);
        } else {
            $("li.page-item.next").css("opacity", 2);
            $("li.page-item.previous").css("opacity", 2);
        }
    };


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
                        $("li.page-item.numberss").removeClass("active");
                        $("li.page-item").eq(1).addClass("active");
                        $("li.page-item.next").css("opacity", 1);
                        $("li.page-item.previous").css("opacity", 0.4);
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


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <>

                <div className={"row col-12"} id={"headerContent"}>
                    <TotalActions deleteUsers={e => handleDeleteGroup(e)} allData={userData} data={checkBox}/>
                    <BreadCrumbs data={breadData}/>
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



                    $("li.page-item.numberss").removeClass("active");
                    $("li.page-item").eq(1).addClass("active");
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);

                    stringSearchs.params.page = 1;
                    GetAllUser(stringSearchs)
                }}/>
                <form id="myForm" style={{marginTop: 15}}>
                    <div className="heading-layout1">
                        <div className="item-title" style={{display: "none"}}>
                            <h3>لیست کاربران</h3>
                        </div>
                        <div className="dropdown" style={{display: "none"}}>
                            <a className="dropdown-toggle" role="button"
                               data-toggle="dropdown" aria-expanded="false">مدیریت</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item sweet-alert-multi-delete-confirm">
                                    <i className="bx bx-trash mr-1"></i> حذف</a>
                            </div>
                        </div>
                    </div>

                    <div className="users-list-table container-fluid">
                        <div className={"row userListRow"} style={{position: 'relative'}}>
                            {userData.data ? userData.data.length > 0 ? userData.data.map((items , index) => (

                                    <Item  key={index} props={items}/>

                                )) :
                                <NotFound/> :
                                <Loading/>}


                            <div className={"backLoadings"}>
                                <div className="spinner-border spinner-border-lg text-info" id={"loading-load"}
                                     role="status">
                                    <span className="sr-only">در حال بارگذاری ...</span>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12">
                            {userData.data ? userData.data.length ? (
                                <Pagination
                                    firstPageUrl={userData.first_page_url}
                                    lastPageUrl={userData.last_page_url}
                                    currentPage={userData.cuerrent_page}
                                    perPage={perPage}
                                    users={allUser}
                                    total={total}
                                    paginate={paginate}
                                />
                            ) : '' : ''}

                        </div>

                    </div>
                </form>


                <BottomNavigationBar userData={userData} deleteAll={e => handleDeleteGroup(e)}/>
            </>
        </CHECK_BOX_CONTENT.Provider>
    )
})

export default UserList;

let elementId = 'show-user-list-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<UserList {...props}/>, element);
}
