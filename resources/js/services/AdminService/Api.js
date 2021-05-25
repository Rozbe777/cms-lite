import {request} from "../Request";

export const Request = {
    // GetAllUserApi : (page) =>  request.get("/users/list?page="+page),
    GetAllUserApi : (page) =>  request.get("/users"),
    GroupDelUser : (userIds) =>  request.post("/user/destroys" , userIds),
    GetAllCategory : () =>  request.get("/category/list?page=1"),
    GetAllPages : () =>  request.get("/page/list"),
    AddNewCategory : (data) =>  request.post("/category/" , data),
    AddNewPage : (data) =>  request.post("/page/" , data),
    DeleteCategoryOne : (data) =>  request.get("/category/"+data+"/destroy/"),
    DeletePageOne : (data) =>  request.get("/page/"+data+"/destroy/"),
    UpdateDataCategory :  (data , id) =>  request.put("/category/"+id+"/update" , data),
    UpdateDataPage :  (data , id) =>  request.put("/page/"+id+"/update" , data),
}
