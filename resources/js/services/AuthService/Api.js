import {request} from "../Request";
import {PHONE_REGISTER_URL} from "../Type";


export const Request = {
    RegisterPhone : data =>  request.post(PHONE_REGISTER_URL , data)
}
