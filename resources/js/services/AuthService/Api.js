import {request} from "../Request";
import {PHONE_REGISTER_URL , VERIFY_MOBILE_URL , STORE_USER_INFO_URL} from "../Type";


export const Request = {
    RegisterPhone : data =>  request.post(PHONE_REGISTER_URL , data),
    VerifyCodeCheck : data =>  request.post(VERIFY_MOBILE_URL , data),
    StoreUserInfo : data => request.post(STORE_USER_INFO_URL , data),
}
