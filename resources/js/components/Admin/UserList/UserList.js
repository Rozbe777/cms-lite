import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './../_Shared/Style.scss';
import {Request} from "./../../../services/AdminService/Api";
import {Pagination} from './../_Micro/Pagination';
import {UserColumns} from './../_Micro/TableColumnsList'
import $ from 'jquery';

const UserList = memo((props) => {
    console.log("props : ", props)
    const [allUser, setAllUser] = useState([]);
    const [allUserSlice, setAllUserSlice] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [userData, setUserData] = useState({});
    const [total, setTotal] = useState();
    const [userId, setUserId] = useState({userIds: []});
    const [loading, setLoading] = useState(false);


    $('.sweet-alert-delete-confirm').on('click', function (event) {
        event.preventDefault();
        const url = $(this).attr('href');
        console.log("urlllll : ", url);
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
    $('.sweet-alert-multi-delete-confirm').on('click', function (event) {
        event.preventDefault();
        const url = $(this).attr('href');
        console.log("urlllll : ", url);
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

                console.log("result value : ", userId)
                // document.getElementById("myForm").submit();
                Swal.fire({
                    type: "success",
                    title: 'حذف شد!',
                    text: 'کاربر مورد نظر حذف شد',
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'باشه',
                });

            }
        });
    });


    toggle = (source) => {
        console.log("attr : ", source)
        let checkboxes = document.getElementsByName('userIds[]');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.checked;
        }
        console.log("checkeddddd : ", JSON.stringify(checkboxes));
    }


    let token = $('meta[name=author]').attr('content');
    let GetAllUser =  async (page) => {
        setLoading(true);
        await Request.GetAllUser(page)
            .then(res => {
                console.log("ressss :", res.data);
                setLoading(false)
                setUserData(res.data);
                setPerPage(res.data.per_page);
                setTotal(res.data.total);
                setAllUser(res.data.data);
            }).catch(err => {
                return err
            })
    }
    useEffect(() => {



        $("#checkOne").click(function () {
            alert("vsdvs");
            // let id = $(this).val();
            // console.log("user id : " , id);
        })


        GetAllUser(1);

    }, [])

    let Checked = (atrs, id) => {
        let checkedss = atrs.checked;
        console.log("data : ", checkedss);

        let userList = [...userId.userIds];

        userList.userIds.length > 0 ? userList.userIds[userList.userIds.length] = id : userList.userIds[0] = id;

    }


    let UnChecked = (id) => {
        let userList = [...userId.userIds];
        var index = userList.indexOf(id)
        if (index !== -1) {
            userList.splice(index, 1);
            setUserId({userIds: userList});
        }

        console.log("userId : ", userId, " id : ", id)
    }


    //   check all

    // $(".checkAll#checkAll").on("change", function () {
    //     if ($(this).is(":checked"))
    //     {
    //         $(".checkAll#checkOne").prop("checked",true);
    //     }else{
    //         $(".checkAll#checkOne").prop("checked",false);
    //     }
    //     console.log("checked is : ", $(this).is(":checked"))
    // })

    const indexOfLastUser = currentPage * perPage;
    const indexOfFirstUser = indexOfLastUser - perPage;
    const currentUsers =  allUser.slice(indexOfFirstUser , indexOfLastUser);

    const paginate = (pageNumber) => {
        GetAllUser(pageNumber);
        $("li.page-item").removeClass("active");
        if (pageNumber == Math.ceil(allUser.length / perPage))
        {
            $("li.page-item.next").css("opacity" , 0.4);
            $("li.page-item.previous").css("opacity" , 1);
        }else if (pageNumber == 1){
            $("li.page-item.next").css("opacity" , 1);
            $("li.page-item.previous").css("opacity" , 0.4);
        }else{
            $("li.page-item.next").css("opacity" , 2);
            $("li.page-item.previous").css("opacity" , 2);
        }
        $("li#"+pageNumber).addClass("active");
    };
    // console.log("data slice : " , currentUsers);

    return (
        <form id="myForm">
            {console.log("user all : ", allUser)}
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
                                <table id="users-list-datatable" className="table">
                                    <thead>
                                    <tr>
                                        <th>
                                            <div className="form-check">
                                                <input type="checkbox"
                                                       id={"checkAll"}
                                                       className="form-check-input checkAll"/>
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
                                    <UserColumns loading={loading} data={currentUsers}/>

                                    </tbody>
                                </table>
                                <div className="col-md-12">
                                    {console.log("userData : " , userData)}
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
