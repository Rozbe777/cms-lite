import React from 'react';
export const UserColumns = ({loading, data }) => {

    console.log("loading", data)
    if (loading) {
        return <p id={'spinner-loading'}>در حال پردازش ...</p>
    }
    return data.map(item => (
        <tr>
            <td className="dt-checkboxes-cell">
                <div className="form-check">
                    <input name={"userIds"} type="checkbox" id={"checkOne"}
                           className="form-check-input checkAll"
                           value={item.id}/>
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
    ))

}

