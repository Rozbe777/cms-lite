import {Request} from './../../../services/AdminService/Api'

export const DeleteGroupt = (event, userIds) => {
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
                }).catch(error => console.log("error", error))
        }
    });
}



export const CaegoryAleert = (event, dataIn, msg ,backMsg) => {
    event.preventDefault();
    let thisis = $(".sweet-alert-multi-delete-confirm");
    const url = thisis.attr('href');
    swal({
        title: msg,
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
            // Request.GroupDelUser(dataIn)
            //     .then(res => {
                    Swal.fire({
                        type: "success",
                        title: backMsg,
                        // text: 'کاربر مورد نظر حذف شد',
                        confirmButtonClass: 'btn btn-success',
                        confirmButtonText: 'باشه',
                    })
                    setTimeout(() => {
                        // window.location.pathname = "/admin/user";
                    }, 700)
                // }).catch(error => console.log("error", error))
        }
    });
}



export const PopUpCreate = ({display}) => {
    return (
        <div className={"back-loader"}>
        </div>
    )

}

const handleAdding = (e) => {
    $(".back-loader").fadeOut();
    setTimeout(()=>{
        $("#category_add_pop_base").fadeIn();
    },200)
}

export const BackLoader = () => {
    return (
        <div className={"back-loader"}>
            <div id={"close-select"} onClick={() => {
                $(".back-loader").fadeOut();
            }}>
            </div>
            <div className={"box-selected"}>
                <ul>
                    <li id={"first"}>لطفا نوع صفحه را انتخاب کنید</li>
                    <li id={"last"} onClick={e =>handleAdding("دسته بندی")}>
                        <div id={"icon"}>
                            <i className={"bx bxs-categories align-middle"}></i>
                        </div>
                        <div id={"desc"}>
                            <p id={"first"} style={{marginTop: '5px !important'}}>دسته بندی</p>
                            <p id={"last"} style={{marginTop: '-10px !important'}}>صفحه ای که مجموعه ای از محصولات
                                را نشان میدهد.</p>
                        </div>
                    </li>

                    <li id={"last"}>
                        <div id={"icon"}>
                            <i className={"bx bxs-layer align-middle"}></i>
                        </div>
                        <div id={"desc"}>
                            <p id={"first"} style={{marginTop: '5px !important'}}>صفحات داخلی</p>
                            <p id={"last"} style={{marginTop: '-10px !important'}}>صفحه ای با محتوای متنی ، مثل
                                درباره ما یا تماس با ما</p>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

    )
}
