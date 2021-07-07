import React , {useContext} from "react";
import {Request} from './../../../../services/AdminService/Api';
import FormHandler from "./FormHandler";
import {error as ErrorToast} from "../../../../helper";

// let formHandler = new FormHandler();
export const HandleFormAdd = (data , checkResult) => {
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


