import {request} from "../Request";

export const Request = {
    GetAllUser : (page) =>  request.get("/admin/user/list?page="+page),
}
