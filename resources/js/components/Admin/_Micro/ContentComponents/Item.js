import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import $ from "jquery";

export const Item = ({
                         allData,
                         key,
                         id,
                         name,
                         status,
                         duplicate: pushDuplicate,
                         itemClick: pushItemClisk,
                         delClick: pushDelClick,
                         dataForEdit: pushDataForEdit
                     }) => {

    // adding new item by click on ( + ) in category item
    const handleAdding = (e) => {
        e.preventDefault();
        pushItemClisk(id);
    }
    useEffect(() => {

    }, [])


    $(function (){
        $("span#sub-menu-custom").click(function () {
            $(this).parents("#li-div").find("#moreOpp." + id).toggleClass("active")
            $(this).find('i.' + id).toggleClass("active");
        })
    })




    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    // handle delete single item by category id
    const HandleDel = (e, idDel) => {
        e.preventDefault()
        swal({
            title: 'حذف صفحه',
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
                    Request.DeleteContentOne(idDel)
                        .then(res => {
                            pushDelClick(res.status)
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت حذف شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })
                        }).catch(err => {
                        if (err.response.data.errors) {
                            ErroHandle(err.response.data.errors);
                        } else {
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }

                    })
                }
            }
        );

    }


    // handle edit single item by id and data
    // this function used for edit and duplicate category
    const HandleEdit = (e, type) => {
        e.preventDefault();
        let editOrDup = JSON.stringify({type, allData})
        pushDataForEdit(editOrDup)
    }


    const HandlePushCheck = (e, idGet) => {
        let checkBoxx = [...checkBox];
        let checkState = e.target.checked;
        var filterRes = checkBoxx.indexOf(idGet);
        $("html, body").animate({scrollTop: 0}, 700);

        if (filterRes !== -1 && checkState === false) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
        } else {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx)
        }

    }

    // const handleClickMenuOpt =( e , ids) => {
    //     e.preventDefault();
    //     $("#moreOpp." + ids).toggleClass("active")
    //     $("span#sub-menu-custom i." + ids).toggleClass("active");
    //
    // }

    return (
        <div id={"li-div"} className={"mini"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                    <fieldset style={{float: "right"}}>
                        <div className="checkbox">
                            <input type="checkbox" name={"checkbox_content_" + id}
                                   onChange={e => HandlePushCheck(e, id)}
                                   className="checkbox-input"
                                   id={id}/>
                            <label htmlFor={id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{name}</span>
                    <span id={"sub-menu-custom"} >
                    <i className={"bx bx-chevron-down"}></i>
                </span>
                </div>


                <div className={"col-12 " + id} id={"moreOpp"}>
                    <i className={"bx bx-show"}></i>
                    <i className={"bx bx-trash-alt"} onClick={e => HandleDel(e, id)}></i>
                    <i className={"bx bx-edit"} onClick={e => HandleEdit(e, "edit")}></i>
                    <i className={"bx bx-duplicate"} onClick={e => HandleEdit(e, "dup")}></i>

                    {status == "active" ? (
                        <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                    ) : (
                        <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                    )}
                </div>


                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        <i className={"bx bx-show"}></i>
                        <i className={"bx bx-trash-alt"} onClick={e => HandleDel(e, id)}></i>
                        <i className={"bx bx-edit"} onClick={e => HandleEdit(e, "edit")}></i>
                        <i className={"bx bx-duplicate"} onClick={e => HandleEdit(e, "dup")}></i>

                        {status == "active" ? (
                            <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                        ) : (
                            <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                        )}
                    </div>
                </div>


            </div>

        </div>
    )
}
