import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/admin/user/list?page="+page),
    GroupDelUser : (userIds) =>  request.post("/admin/user/destroys" , userIds),
    GetAllCategory : () =>  request.get("/admin/category/list"),
    AddNewCategory : (data) =>  request.post("/admin/category/" , data),
}
