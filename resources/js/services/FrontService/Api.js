import {request} from "../Request";

export const Request = {
    storeCheckoutUserInfo : (data) =>  request.post("/front/register" ,data),
    storeUserMobile : (data) =>  request.post("front/mobile/register" ,data),
    verifyUserMobileToken : (data) =>  request.post("front/mobile/check" ,data),
}
