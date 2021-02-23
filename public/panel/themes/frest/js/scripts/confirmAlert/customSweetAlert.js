function userDeleteConfirm(){

    // Swal.fire({
    //     title: 'خذف کاربر',
    //     text: "آیا مطمئنید؟",
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'تایید',
    //     confirmButtonClass: 'btn btn-primary',
    //     cancelButtonClass: 'btn btn-danger ml-1',
    //     cancelButtonText: 'انصراف',
    //     buttonsStyling: false,
    // }).then(function (result) {
    //     if (result.value) {
    //         Swal.fire({
    //             type: "success",
    //             title: 'حذف شد!',
    //             text: 'کاربر مورد نظر حذف شد',
    //             confirmButtonClass: 'btn btn-success',
    //             confirmButtonText: 'باشه',
    //         });
    //     }
    // });





}

$('.sweet-alert-delete-confirm').on('click', function (event) {
    alert("salam");
    event.preventDefault();
    const url = $(this).attr('href');
    swal({
        title: 'خذف کاربر',
        text: "آیا مطمئنید؟",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'تایید',
        confirmButtonClass: 'btn btn-primary',
        cancelButtonClass: 'btn btn-danger ml-1',
        cancelButtonText: 'انصراف',
        buttonsStyling: false,
    }).then(function(result) {
        if (result.value) {

            Swal.fire({
                type: "success",
                title: 'حذف شد!',
                text: 'کاربر مورد نظر حذف شد',
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'باشه',
            });

            window.location.href = url;
        }
    });
});
