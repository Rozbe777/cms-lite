import React, {useContext} from "react";
import {Request} from './../../../../services/AdminService/Api';
import {error as ErrorToast} from "../../../../helper";
import {ErroHandle} from "../../../../helper";
import $ from "jquery";
import RequestHandler from "./RequestHandler";
// let formHandler = new FormHandler();
export const HandleFormAdd = (data, checkResult) => {
    swal({
        title: 'افزودن محتوا جدید',
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
            Request.AddNewContent(data)
                .then(res => {
                    checkResult(true);
                    $(".pagination li.page-item.numberss").removeClass("active")
                    $("ul.pagination li").eq(1).addClass("active")
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);
                    $("span.checkboxeds").removeClass("active");
                    Swal.fire({
                        type: "success",
                        title: 'با موفقیت اضافه شد !',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })
                }).catch(err => {
                if (err.response) {
                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                }
            })
        }
    });
}



export const HandleUpdateForm = (data, id, checkResult) => {
    swal({
        title: 'ویرایش صفحه',
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
            Request.UpdateDataContent(data, id)
                .then(res => {
                    $("span.checkboxeds").removeClass("active");
                    checkResult(true);
                    localStorage.removeItem("is_menu");
                    localStorage.removeItem("status");
                    localStorage.removeItem("selected");
                    localStorage.removeItem("comment_status");
                    localStorage.removeItem("robots");
                    Swal.fire({
                        type: "success",
                        title: 'با موفقیت ویرایش شد !',
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
    });

}

export const HandleDeleteGroup = (event, checkBox, setCheckBox, handleReload, GetAllContents, stringSearchs) => {

    let finalAllIds = {};
    finalAllIds.contentIds = checkBox;

    finalAllIds._token = $('meta[name="csrf-token"]').attr('content');

    event.preventDefault();
    swal({
        title: 'حذف محتوا',
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
            Request.GroupDelContent(finalAllIds)
                .then(res => {
                    setCheckBox([])
                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'محتوا مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })

                    stringSearchs.params.page = 1;
                    $(".pagination li.page-item.numberss").removeClass("active")
                    $(".pagination li#1.page-item.numberss").addClass("active")

                    RequestHandler.GetAllContents('', setLoading, setContentData, setPerPage, setContentAll, setTotal);

                    GetAllContents(stringSearchs);
                }).catch(error => {
                if (error.response.data.errors) {
                    ErroHandle(error.response.data.errors)
                } else {
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }
            })
        }
    });
}

