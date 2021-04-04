import React from 'react';

const ColumnsTable = ({name, itemId, email, phone, persianStatus, userRole, avatar}) => {
    return (
        <tr>
            <td className="dt-checkboxes-cell">
                <div className="form-check">
                    <input name={"userIds"} type="checkbox" id={"checkOne"} className="form-check-input checkAll"
                           value={itemId}/>
                    {/*onChange={$(this).is(":checked") ? setUserId({...userId , userIds}) : ''} name="userIds[]" value="user id"/>*/}
                    <label className="form-check-label"></label>
                </div>
            </td>
            <td>{itemId}</td>
            <td>
                <div className="d-flex align-items-center my-n50">
                    <img className="rounded-circle"
                         src={avatar ? avatar : '/images/avatar.jpg'}
                         alt="avatar" height="32"
                         width="32"/>
                    <div className="ml-1 line-height-2">
                        <span>{name}</span>
                    </div>
                </div>

            </td>
            <td>{email}</td>
            <td>{phone}</td>

            <td>{userRole == "admin" ? "مدیر" : 'کاربر'}</td>


            <td>
                {persianStatus == "فعال" ? (
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
                           href={"/admin/user/" + itemId + "/edit"}>
                            <i className="bx bx-edit-alt mr-1"></i> ویرایش</a>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default ColumnsTable;
