import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/Style.scss';
import {Request} from "../../../services/AdminService/Api";
import {GetAllUser} from '../../../services/AdminService';
import ColumnsTable from './Micro/ColumnsTable'
// import {paginate} from "./Micro/Paginate";
import $ from 'jquery';

const UserList = memo((props) => {
    console.log("props : ", props)
    const [allUser, setAllUser] = useState();
    const [userId , setUserId] = useState({userIds : []});




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

                console.log("result value : " , userId)
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
        console.log("attr : " , source)
        let checkboxes = document.getElementsByName('userIds[]');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.checked;
        }
        console.log("checkeddddd : " , JSON.stringify(checkboxes));
    }


    let token = $('meta[name=author]').attr('content');
    useEffect(() => {
        let GetAllUser = () => {
            Request.GetAllUser()
                .then(res => {
                    setAllUser(res.data);
                }).catch(err => {
                return err
            })
        }



        $("#checkOne").click(function (){
            alert("vsdvs");
            // let id = $(this).val();
            // console.log("user id : " , id);
        })


        GetAllUser();

    }, [])

    console.log("all user : ", allUser);

    let Checked = (atrs , id) => {
        let checkedss = atrs.checked;
        console.log("data : " , checkedss);

        let userList = [...userId.userIds];

        userList.userIds.length > 0 ? userList.userIds[userList.userIds.length] = id : userList.userIds[0] = id;

        console.log("userId : " , userList , "id : " , id)
    }
    let UnChecked = (id) => {
        let userList = [...userId.userIds];
        var index = userList.indexOf(id)
        if (index !== -1) {
            userList.splice(index, 1);
            setUserId({userIds: userList});
        }

        console.log("userId : " , userId , " id : " , id)
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



    const paginateItem = [];
    let paginate = (data) => {
        let i;
        for(i=1 ; i <= data.last_page ; i++)
        {
            paginateItem.push(i);
        }
    }

    return (
        <form id="myForm">
            {GetAllUser()}
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
                                        <th className="dt-checkboxes-cell dt-checkboxes-select-all sorting_disabled"
                                            rowSpan="1" colSpan="1" style={{width: '75px;'}} data-col="0" aria-label="">
                                            <a style={{padding: '0px'}}
                                               // onClick={toggle(this)}
                                               href={props.destroylink}
                                               className="dropdown-item sweet-alert-multi-delete-confirm"
                                               id="icon-delete-list">
                                                <i className="bx bx-trash mr-1"></i></a>
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
                                    {allUser ? allUser.data.map(item => <ColumnsTable
                                                name={item.name ? item.name : '' +" "+item.last_name ? item.last_name : ''}
                                                itemId = {item.id}
                                                email = {item.email}
                                                phone = {item.phone}
                                                persianStatus = {item.persianStatus}
                                                userRole={item.userRole}
                                                avatar = {item.avatar}
                                            />) : (
                                        <p id={'spinner-loading'}>در حال پردازش ...</p>
                                    )}


                                    </tbody>
                                </table>
                                {allUser ? paginate(allUser) : 'wait ...'}
                                <div className="col-md-12">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination pagination-borderless justify-content-center mt-2">
                                            <li className="page-item previous"><a className="page-link" href="#">
                                                <i className="bx bx-chevron-right"></i>
                                            </a></li>


                                            {paginateItem.map(page => {
                                                return (
                                                    <li className="page-item"><a className="page-link" href={allUser ? allUser.links[page] : 'wait'}>{page}</a></li>

                                                    )

                                            })}


                                            <li className="page-item next"><a className="page-link" href="#">
                                                <i className="bx bx-chevron-left"></i>
                                            </a></li>
                                        </ul>
                                    </nav>


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
