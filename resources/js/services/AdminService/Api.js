import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/users" ,page),
    GroupDelUser : (userIds) =>  request.delete("/users/multi/destroy" , {params : userIds}),
    CreateUserNew : (data) =>  request.post("/users" , data),
    UpdateUserDetail : (data , id) =>  request.put("/users/"+id , data),
    GetAllCategory : () =>  request.get("/categories?page=1"),
    GetAllPages : () =>  request.get("/pages"),
    AddNewCategory : (data) =>  request.post("/categories" , data),
    AddNewPage : (data) =>  request.post("/pages" , data),
    DeleteCategoryOne : (data) =>  request.get("/categories/"+data),
    DeletePageOne : (data) =>  request.get("/pages/"+data),
    UpdateDataCategory :  (data , id) =>  request.put("/categories/"+id+"" , data),
    UpdateDataPage :  (data , id) =>  request.put("/pages/"+id+"" , data),
    GetAllContents :  () =>  request.get("/contents"),
}
