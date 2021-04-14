import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/admin/user/list?page="+page),
    GroupDelUser : (userIds) =>  request.post("/admin/user/destroys" , userIds),
    GetAllCategory : () =>  request.get("/admin/category/list?page=1"),
    GetAllPages : () =>  request.get("/admin/page/list"),
    AddNewCategory : (data) =>  request.post("/admin/category/" , data),
    AddNewPage : (data) =>  request.post("/admin/page/" , data),
    DeleteCategoryOne : (data) =>  request.get("/admin/category/"+data+"/destroy/"),
    UpdateDataCategory :  (data , id) =>  request.put("/admin/category/"+id+"/update" , data),
}
