import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/users" ,page),
    GroupDelUser : (userIds) =>  request.delete("/users/multi/destroy" , {params : userIds}),
    GroupDelCategory : (categoryId) =>  request.delete("/categories/multi/destroy" , {params : categoryId}),
    GroupDelContent : (contentIds) =>  request.delete("/contents/multi/destroy" , {params : contentIds}),
    GroupDelPage : (pageIds) =>  request.delete("/pages/multi/destroy" , {params : pageIds}),
    CreateUserNew : (data) =>  request.post("/users" , data),
    UpdateUserDetail : (data , id) =>  request.put("/users/"+id , data),
    GetAllCategory : () =>  request.get("/categories?page=1"),
    GetAllTags : () =>  request.get("/tags"),
    GetAllPages : () =>  request.get("/pages"),
    AddNewCategory : (data) =>  request.post("/categories" ,  data),
    AddNewProduct : (data) =>  request.post("/products" ,  data),
    AddNewPage : (data) =>  request.post("/pages" , data),
    AddNewContent : (data) =>  request.post("/contents" , data),
    DeleteCategoryOne : (data) =>  request.delete("/categories/"+data),
    DeletePageOne : (data) =>  request.delete("/pages/"+data),
    DeleteContentOne : (data) =>  request.delete("/contents/"+data),
    UpdateDataCategory :  (data , id) =>  request.put("/categories/"+id+"" , data),
    UpdateDataPage :  (data , id) =>  request.put("/pages/"+id+"" , data),
    UpdateDataContent :  (data , id) =>  request.put("/contents/"+id+"" , data),
    GetAllContents :  (search) =>  request.get("/contents" ,  search),
    GetAllProducts :  (search) =>  request.get("/contents" ,  search),
}
