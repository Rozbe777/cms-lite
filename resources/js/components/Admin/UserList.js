import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/Style.scss';
import {Request} from "../../services/AdminService/Api";
import {GetAllUser} from './../../services/AdminService';
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
                                    {allUser ? allUser.data.map(item => {
                                        let userIds = item.id;
                                        return (
                                            <tr>
                                                <td className="dt-checkboxes-cell">
                                                    <div className="form-check">
                                                        <input name={"userIds"} type="checkbox" id={"checkOne"} className="form-check-input checkAll"
                                                                value={item.id} />
                                                               {/*onChange={$(this).is(":checked") ? setUserId({...userId , userIds}) : ''} name="userIds[]" value="user id"/>*/}
                                                        <label className="form-check-label"></label>
                                                    </div>
                                                </td>
                                                <td>{item.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center my-n50">
                                                        <img className="rounded-circle"
                                                             src={item.avatar ? item.avatar : '/images/avatar.jpg'}
                                                             alt="avatar" height="32"
                                                             width="32"/>
                                                        <div className="ml-1 line-height-2">
                                                            <span>{item.name ? item.name : '' + " " + item.last_name ? item.last_name : ''}</span>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>

                                                <td>{item.userRole == "admin" ? "مدیر" : 'کاربر'}</td>


                                                <td>
                                                    {item.persianStatus == "فعال" ? (
                                                        <div className="badge badge-pill badge-light-success">فعال</div>
                                                    ) : (
                                                        <div className="badge badge-pill badge-light-danger">غیرفعال
                                                        </div>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="dropup">
                                                    <span
                                                        className="bx bx-dots-vertical-rounded font-medium-3 dropdown-toggle nav-hide-arrow cursor-pointer"
                                                        data-toggle="dropdown" aria-haspopup="false"
                                                        aria-expanded="false" role="menu">
                                                    </span>
                                                        <div className="dropdown-menu " x-placement="bottom-start"
                                                             style={{
                                                                 position: 'absolute',
                                                                 willChange: 'transform',
                                                                 top: '0px',
                                                                 left: '0px',
                                                                 transform: 'translate3d(28px, 23px, 0px)'
                                                             }}>
                                                            {/*    {{route('admin.user.edit',$user->id)}}  */}
                                                            <a className="dropdown-item"
                                                               href={"/admin/user/" + item.id + "/edit"}>
                                                                <i className="bx bx-edit-alt mr-1"></i> ویرایش</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <p id={'spinner-loading'}>در حال پردازش ...</p>
                                    )}


                                    </tbody>
                                </table>
                                <div className="col-md-12">


                                                <nav aria-label="Page navigation">
                                                    <ul className="pagination pagination-borderless justify-content-center mt-2">
                                                        <li className="page-item previous"><a className="page-link"
                                                                                              href="#">
                                                            <i className="bx bx-chevron-right"></i>
                                                        </a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">3</a></li>
                                                        <li className="page-item active" aria-current="page"><a
                                                            className="page-link" href="#">4</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">5</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">6</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">7</a></li>
                                                        <li className="page-item next"><a className="page-link"
                                                                                          href="#">
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
