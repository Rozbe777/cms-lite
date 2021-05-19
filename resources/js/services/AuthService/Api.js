import {request} from "../Request";
import {PHONE_REGISTER_URL , VERIFY_MOBILE_URL , STORE_USER_INFO_URL  ,LOGIN_URL ,PASSWORD_TOKEN_URL , PASSWORD_RESET_URL} from "../Type";


export const Request = {
    RegisterPhone : data =>  request.post(PHONE_REGISTER_URL , data),
    VerifyCodeCheck : data =>  request.post(VERIFY_MOBILE_URL , data),
    StoreUserInfo : data => request.post(STORE_USER_INFO_URL , data),
    PasswordToken : data => request.post(PASSWORD_TOKEN_URL , data),
    RecoveryPass : data => request.post(PASSWORD_RESET_URL , data),
    Login : data => request.post(LOGIN_URL , data),
}
