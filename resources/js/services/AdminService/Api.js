import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/admin/user/list?page="+page),
    GroupDelUser : (userIds) =>  request.post("/admin/user/destroys" , userIds),
}
