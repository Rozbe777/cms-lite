import {Request} from "../../../../services/AdminService/Api";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import FormHandler from "./FormHandler";
import $ from "jquery";
export default class RequestHandler{

    HandleGetImg(name , setLoading , setImage){
        let names = name.split("/")
        setLoading(true)
        Request.GetImage(names[2])
            .then(rr => {
                setLoading(false)
                setImage({state: rr.data})
            }).catch(err => {
            ErrorToast("خطایی در دانلود تصویر رخ داده است")

        })
        return true;
    }





    GetAllCategory(setLoading , setCategoryData ){
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {
                setLoading(false)
                setCategoryData(res.data.data)
            })
            .catch(err => {
                if (err.response.data.errors) {
                    ErroHandle(err.response.data.errors);
                } else {
                    $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }

            })

        return true;
    }


}
