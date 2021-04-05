import {Request} from './../../../services/AdminService/Api'

export const DeleteGroupt = (event , userIds) => {
    event.preventDefault();
    let thisis = $(".sweet-alert-multi-delete-confirm");
    const url = thisis.attr('href');
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
            Request.GroupDelUser(userIds)
                .then(res => {
                    Swal.fire({
                        type: "success",
                        title: 'حذف شد!',
                        text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })
                    setTimeout(() => {
                        window.location.pathname = "/admin/user";
                    }, 700)
                }).catch(error => console.log("error" , error))
        }
    });
}
