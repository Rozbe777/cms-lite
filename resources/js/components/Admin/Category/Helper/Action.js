import React, {useContext} from "react";
import {Request} from './../../../../services/AdminService/Api';
import {error as ErrorToast} from "../../../../helper";
import {ErroHandle} from "../../../../helper";
import $ from "jquery";
import RequestHandler from "./RequestHandler";

export const CreateAddCategory = (data, checkResult) => {
    swal({
        title: 'افزودن دسته بندی جدید',
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
            Request.AddNewCategory(data)
                .then(res => {
                    checkResult(true);
                    Swal.fire({
                        type: "success",
                        title: 'با موفقیت اضافه شد !',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })
                    return true;

                }).catch(err => {
                if (err.response.data) {
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
        title: 'ویرایش دسته بندی',
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
            Request.UpdateDataCategory(data, id)
                .then(res => {
                    checkResult(true)
                    Swal.fire({
                        type: "success",
                        title: 'با موفقیت ویرایش شد !',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })
                    return true;

                }).catch(err => {
                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                }
            )
        }
    });
}
