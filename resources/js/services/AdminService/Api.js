import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/users" ,page),
    GroupDelUser : (userIds) =>  request.delete("/users/multi/destroy" , {params : userIds}),
    GroupDelContent : (contentIds) =>  request.delete("/contents/multi/destroy" , {params : contentIds}),
    CreateUserNew : (data) =>  request.post("/users" , data),
    UpdateUserDetail : (data , id) =>  request.put("/users/"+id , data),
    GetAllCategory : () =>  request.get("/categories?page=1"),
    GetAllPages : () =>  request.get("/contents?owner=page"),
    AddNewCategory : (data) =>  request.post("/categories" ,  data),
    AddNewPage : (data) =>  request.post("/pages" , data),
    AddNewContent : (data) =>  request.post("/contents" , data),
    DeleteCategoryOne : (data) =>  request.delete("/categories/"+data),
    DeletePageOne : (data) =>  request.delete("/pages/"+data),
    DeleteContentOne : (data) =>  request.delete("/contents/"+data),
    UpdateDataCategory :  (data , id) =>  request.put("/categories/"+id+"" , data),
    UpdateDataPage :  (data , id) =>  request.put("/pages/"+id+"" , data),
    UpdateDataContent :  (data , id) =>  request.put("/contents/"+id+"" , data),
    GetAllContents :  () =>  request.get("/contents?status&pageSize&owner&search"),
}
