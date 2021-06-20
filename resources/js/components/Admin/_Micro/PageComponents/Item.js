import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import $ from "jquery";

export const Item = ({
                         allData,
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
                Request.DeletePageOne(idDel)
                    .then(res => {
                        setCheckBox([])
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
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                        $(".tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }

                })
            }
        });

    }


    useEffect(() => {

    }, [])


    $(function (){
        $("span#sub-menu-custom").click(function () {
            $(this).parents("#li-div").find(".pageIt#moreOpp." + id).toggleClass("active")
            $(this).find('i.' + id).toggleClass("active");
        })
    })



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
        if (filterRes !== -1 && checkState === false) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
        } else {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx)
        }

    }

    // const handleOption = (e , ids) => {
    //     e.preventDefault();
    //     $("#moreOpp."+ids).toggleClass("active")
    //     // $("#li-div #sub-menu-custom i."+ids).toggleClass("active")
    //
    //
    // }

    const handleClickOpt = (e) => {
        console.log("......" , e.target.nodeName)
    }


    return (
        <div id={"li-div"} className={"mini"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-12"} style={{padding: 13}}>
                    <fieldset style={{float: "right"}}>
                        <div className="checkbox" attr-ids={id}>
                            <input type="checkbox" name={"checkbox_content_" + id}
                                   onChange={e => HandlePushCheck(e, id)}
                                   className="checkbox-input"
                                   id={id}/>
                            <label htmlFor={id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{name}</span>

                    <span id={"sub-menu-custom"} onClick={e => handleClickOpt(e)}>
                    <i className={"bx bx-chevron-down " + id}></i>
                </span>
                </div>


                <div className={"col-12 pageIt " + id} id={"moreOpp"}>
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


            {/*<div className={"back-blur"}>*/}

            {/*    <div id={"bottom-chip"}>*/}
            {/*        <div className={"form-check"}>*/}

            {/*            <ul>*/}
            {/*                <li onClick={e => HandleEdit(e, "dup")}>کپی صفحه</li>*/}
            {/*                <li onClick={e => HandleEdit(e, "edit")}>ویرایش صفحه</li>*/}
            {/*                <li onClick={e => HandleDel(e)}>حذف</li>*/}
            {/*                <li>مشاهده</li>*/}
            {/*                <li onClick={e => handleAdding(e)}>افزودن زیر دسته</li>*/}
            {/*            </ul>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


        </div>
    )
}
