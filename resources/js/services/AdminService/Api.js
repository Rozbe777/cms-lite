import {request} from "../Request";

export const Request = {
    GetAllUser : () =>  request.get("/admin/user/export"),
}
