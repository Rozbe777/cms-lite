import {Request} from "../../../../services/AdminService/Api";
import {error as ErrorToast} from "../../../../helper";
import FormHandler from "./FormHandler";
let formHandler = new FormHandler();
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
            setTimeout(() => {
                formHandler.handleClose();
            }, 1300)

        })
        return true;
    }

}
