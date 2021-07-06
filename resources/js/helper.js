export const csrf_token = (token = null) => {
    return (<input name="_token" id="csrf-token" type='hidden' value={token}/>)
}
export const url = (url) => {
    return new URL('/', location.href).href + url;
}
export const redirect = (to) => {
    return window.location.href = to;
}
export const separate = (Number) => {
    Number += '';
    Number = Number.replace(',', '');
    let x = Number.split('.');
    let y = x[0];
    let z = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
        y = y.replace(rgx, '$1' + ',' + '$2');
    return y + z;
};
export const convertDigit = (value) => {

    let persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    let arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    // if (typeof value === 'string') {
    for (var i = 0; i < 10; i++) {
        value = value.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
    // }
    return value;
};
export const empty = (value) => {
    return (value === undefined || value === null || value === 0 || value === '' || value === '0');
};

const toastOptions = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "100",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "show",
    "hideMethod": "hide",
    "positionClass": "toast-bottom-right",
};
export const error = (message) => {
    toastr.options = toastOptions;
    toastr.error(message);
}
export const fail = (message = null) => {
    toastr.options = toastOptions;
    if (empty(message)) {
        message = 'مشکلی در ارتباط با سرور رخ داده است!'
    }
    toastr.error(message);
}
export const success = (message) => {
    toastr.options = toastOptions;
    toastr.success(message);
}
export const warning = (message) => {
    toastr.options = toastOptions;
    toastr.warning(message);
}
export const info = (message) => {
    toastr.options = toastOptions;
    toastr.info(message);
}

export const ErroHandle = (err) => {
    Object.values(err).map(errorItem => {
        errorItem.map(errorMsg => {
            if (errorMsg === "") {

            } else {
                error(errorMsg)
            }
        })
    })

}
// export const ErroHandleObj = (err) => {
//     Object.values(err).map(errorItem => {
//         errorItem.map(errorMsg => {
//             if (errorMsg === "") {
//
//             } else {
//                 error(errorMsg)
//             }
//         })
//     })
//
// }
