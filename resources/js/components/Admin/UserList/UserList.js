import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './../_Shared/Style.scss';
import {Request} from "./../../../services/AdminService/Api";
import {Pagination} from './../_Micro/Pagination';
import {UserColumns} from './../_Micro/TableColumnsList'
import {DeleteGroupt} from './../_Shared/java';
import $ from 'jquery';

const UserList = memo((props) => {
    const {token} = props;
    const [allUser, setAllUser] = useState([]);
    const [allUserSlice, setAllUserSlice] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState({userIds: []});
    let userIdArr = [];

    $('.sweet-alert-delete-confirm').on('click', function (event) {
        event.preventDefault();
        const url = $(this).attr('href');
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
                Swal.fire({
                    type: "success",
                    title: 'حذف شد!',
                    text: 'کاربر مورد نظر حذف شد',
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'باشه',
                });

                // window.location.href = url;
            }
        });
    });




    // let token = $('meta[name=author]').attr('content');
    let GetAllUser = (page) => {
        setLoading(true);
        Request.GetAllUserApi(page)
            .then(res => {
                setLoading(false)
                setUserData(res.data);
                setPerPage(res.data.per_page);
                setTotal(res.data.total);
                setAllUser(res.data.data);
            }).catch(err => {
            return err
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
        GetAllUser(1);

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
        GetAllUser(pageNumber);
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


    const handleDeleteGroup = (event) => {
        event.preventDefault();

        let thisis = $(".sweet-alert-multi-delete-confirm");
        const url = thisis.attr('href');
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
                Request.GroupDelUser(userId)
                    .then(res => {
                        Swal.fire({
                            type: "success",
                            title: 'حذف شد!',
                            text: 'کاربر مورد نظر حذف شد',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })
                        GetAllUser(1);
                    }).catch(error => console.log("error", error))
            }
        });
    }

    return (
        <form id="myForm">
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

            <div className="users-list-table">
                <form>
                    <div className="users-list-filter px-1">
                        <div className="row border rounded py-2 mb-2" id={"header-card-custom"}>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <label htmlFor="users-list-verified">جستجو</label>
                                <input type="text" className="form-control"
                                       placeholder="جستجو با ایمیل و تلفن ..." name="search"/>

                            </div>

                            <div className="col-12 col-sm-6 col-lg-2">
                                <label htmlFor="users-list-verified">تایید شده</label>
                                <fieldset className="form-group">
                                    <select className="form-control" id="users-list-verified" name="confirmed">
                                        <option>همه</option>
                                        <option value="1">بله</option>
                                        <option value="0">خیر</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-2">
                                <label htmlFor="users-list-role">نقش</label>
                                <fieldset className="form-group">
                                    <select className="form-control" id="users-list-role" name="role">
                                        <option>همه</option>
                                        <option>مدیر</option>
                                        <option>کاربر</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-2">
                                <label htmlFor="users-list-status">وضعیت</label>
                                <fieldset className="form-group">
                                    <select className="form-control" id="users-list-status" name="status">
                                        <option>همه</option>
                                        <option value="active">فعال</option>
                                        <option value="deactivate">غیر فعال</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="col-6 col-sm-3 col-lg-1 " style={{marginBlockStart: 'auto'}}>
                                <button type="submit" className="btn btn-primary mr-1 mb-1">جستجو</button>
                            </div>
                            <div className="col-6 col-sm-3 col-lg-1 " style={{marginBlockStart: 'auto'}}>
                                <a className="btn btn-icon rounded-circle btn-warning mr-1 mb-1 tui-full-calendar-dayname-leftmargin"
                                   href={props.exportlink}
                                   style={{marginRight: '20px'}} title="خروجی اکسل">
                                    <i className="bx bx-archive"></i></a>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="card">
                    <div className="card-content">
                        <div className="card-body" style={{padding: '0px'}}>
                            <div className="table-responsive">
                                <table id="users-list-datatable" className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>
                                            <div className={"form-check"}>

                                                <div id={"edit-boxes"}>
                                                    <a className="dropdown-item" onClick={e => handleDeleteGroup(e)}
                                                       style={{cursor: 'pointer'}}>
                                                        <i style={{float: 'right'}}
                                                           className="bx bx-trash mr-1"></i> حذف گروهی</a>
                                                </div>

                                                <input type="checkbox"
                                                       id={"checkAll"}
                                                       onClick={() => allUser ? addAll(allUser) : ''}
                                                       className="form-check-input "/>
                                                <label className="form-check-label"></label>
                                            </div>

                                        </th>
                                        <th>ID</th>
                                        <th>کاربر</th>
                                        <th>ایمیل</th>
                                        <th>شماره موبایل</th>
                                        <th>نقش</th>
                                        <th>وضعیت</th>
                                        <th>عملیات</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    <UserColumns oldUserId={userId.userIds} loading={loading}
                                                 data={currentUsers}
                                                 userid={item => {
                                                     selectHandler(item)
                                                 }}
                                                 pushPopFade={stat => stat ? $("#edit-boxes").fadeIn(0) : $("#edit-boxes").fadeOut(0)}

                                    />

                                    </tbody>
                                </table>
                                <div className="col-md-12">
                                    {userData ? (
                                        <Pagination
                                            firstPageUrl={userData.first_page_url}
                                            lastPageUrl={userData.last_page_url}
                                            currentPage={userData.cuerrent_page}
                                            perPage={perPage}
                                            users={allUser}
                                            total = {total}
                                            paginate={paginate}
                                        />
                                    ) : 'wait'}

                                </div>
                                <div className="d-flex justify-content-center">
                                    {/*{!! $users->links('vendor.pagination.custom') !!}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
})

export default UserList;

let elementId = 'show-user-list-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<UserList {...props}/>, element);
}
