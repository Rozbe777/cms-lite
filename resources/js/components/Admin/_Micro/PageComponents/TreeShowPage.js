import React, {useContext, useEffect, useState} from 'react';
import {Item} from './Item';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {Request} from "../../../../services/AdminService/Api";
import {ErroHandle, error as ErrorToast} from "../../../../helper";

export const TreeShowPage = ({
                                 data,
                                 loading,
                                 token,
                                 callBack: pushCallBack,
                                 itemClicks: pushItemCliks,
                                 duplicate: pushDuplicate,
                                 delClick: pushDelClick,
                                 updateData: pushUpdateData
                             }) => {


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)
    const [idDelete, setIdDelete] = useState([]);


    useEffect(() => {
        $("div#li-div").mouseover(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $(this).find("#moreOpp").addClass("active")
            $(this).find("#sub-menu-custom i").addClass("active")

        })
        $("div#li-div").mouseout(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $("#li-div #moreOpp").removeClass("active")
            $(this).find("#sub-menu-custom i").removeClass("active")


        })
    }, [])


    data.data.data.map(item => {
        var filter = checkBox.indexOf(item.id);
        if (filter !== -1) {
            $("input[name=checkbox_content_" + item.id).prop("checked", true)
        } else {
            $("input[name=checkbox_content_" + item.id).prop("checked", false)
        }
    });


    $(function () {
        $("span#sub-menu-custom").click(function () {
            $(".back-blur").fadeIn(100);
            let idDel = [...idDelete];
            let ids = $(this).attr("attr-ids");
            idDel.push(ids)
            setIdDelete(ids)
            setTimeout(() => {
                $("#bottom-chip").addClass("active");
            }, 200)
        })
        $(".back-blur").click(() => {
            // localStorage.removeItem(dataTransitionKey);
            $("#bottom-chip").removeClass("active");
            setTimeout(() => {
                $(".back-blur").fadeOut(100)
            }, 200)
        })
    });




    let dataWithOutPaginate = data.data.data;
    const handlePush = (item) => {
        pushCallBack(item);
    }
    const HandleClick = (id) => {
        pushItemCliks(id);
    }
    const HndleDuplicate = (item) => {
        pushDuplicate(item)
    }
    const HandleDelClick = (item) => {
        pushDelClick(item)
    }
    const HandleDataForUpdate = (data) => {
        pushUpdateData(data);
    }
    if (loading) {
        return <Loading/>
    }

    const HandleDel = (e) => {
        e.preventDefault();

        let delIds = {};
        delIds.pageIds = idDelete;
        delIds._token = token;
        if (idDelete) {
            swal({
                title: 'حذف دسته بندی',
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
                    Request.GroupDelPage(delIds)
                        .then(res => {
                            pushDelClick(res.status)
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت حذف شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })


                        }).catch(error => {
                        if (error.response.data.errors) {
                            ErroHandle(error.response.data.errors)
                        } else {
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }
                    })
                }
            });

        } else {
            alert("لطفا آیتمی را برای حذف انتخاب کنید!");
        }

    }


    const handleAdding = () => {
        pushItemCliks(ids);
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <ul className={"content-li"}>
                {dataWithOutPaginate ? dataWithOutPaginate.map((keyName , index) => {
                        return (
                            <li key={index} style={{position: 'relative'}}>
                                <div className={"branch-top"}>
                                </div>
                                <Item name={keyName.title}
                                      allData={keyName}
                                      id={keyName.id}
                                      status={keyName.status}
                                      callBack={item => handlePush(item)}
                                      duplicate={item => HndleDuplicate(item)}
                                      delClick={item => HandleDelClick(item)}
                                      dataForEdit={item => HandleDataForUpdate(item)}
                                      itemClick={itemId => HandleClick(itemId)}
                                />

                            </li>

                        )
                    }
                ) : (
                    <Loading/>
                )}
            </ul>

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
        </CHECK_BOX_CONTENT.Provider>
    )

}
