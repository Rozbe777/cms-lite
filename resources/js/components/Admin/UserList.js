import React, {memo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/Style.scss';
import {Request} from "../../services/AdminService/Api";
import {GetAllUser} from './../../services/AdminService';
import $ from 'jquery';

const UserList = memo((props) => {
    console.log("props : ", props)
    const [allUser, setAllUser] = useState();


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

        GetAllUser();

    }, [])

    console.log("all user : ", allUser);

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
                                               onClick="toggle(this)"
                                               className="dropdown-item sweet-alert-multi-delete-confirm"
                                               id="icon-delete-list">
                                                <i className="bx bx-trash mr-1"></i></a>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input checkAll"/>
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
                                        return (
                                            <tr>
                                                <td className="dt-checkboxes-cell">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input checkAll"
                                                               name="userIds[]" value="user id"/>
                                                        <label className="form-check-label"></label>
                                                    </div>
                                                </td>
                                                <td>{item.id}</td>
                                                <td>
                                                    <div className="d-flex align-items-center my-n50">
                                                        <img className="rounded-circle" src = {item.avatar ? item.avatar : '/images/avatar.jpg'} alt="avatar" height="32"
                                                             width="32"/>
                                                        <div className="ml-1 line-height-2">
                                                            <span>{item.name ? item.name :'' + " " + item.last_name ? item.last_name : ''}</span>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                {/*<td>{{$user->roles()->first()->name == "admin" ? "مدیر" : 'کاربر'}}</td>*/}
                                                <td>not res</td>
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
                                                            <a className="dropdown-item" href={"/admin/user/"+item.id+"/edit"}>
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
                                    if (element)
                                    {
                                        const props = Object.assign({}, element.dataset);
                                        ReactDOM.render(<UserList {...props}/>, element);
                                    }
