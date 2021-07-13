import {request} from "../Request";

export const Request = {
    storeCheckoutUserInfo : (data) =>  request.post("/front/register" ,data),
}
