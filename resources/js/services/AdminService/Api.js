import {request} from "../Request";

export const Request = {
    GetAllUserApi : (page) =>  request.get("/users" ,page),
    GroupDelUser : (userIds) =>  request.delete("/users/multi/destroy" , {params : userIds}),
    GroupDelCategory : (categoryId) =>  request.delete("/categories/multi/destroy" , {params : categoryId}),
    GroupDelContent : (contentIds) =>  request.delete("/contents/multi/destroy" , {params : contentIds}),
    GroupDelPage : (pageIds) =>  request.delete("/pages/multi/destroy" , {params : pageIds}),
    GroupDelProduct : (pageIds) =>  request.delete("/products/multi/destroy" , {params : pageIds}),
    CreateUserNew : (data) =>  request.post("/users" , data),
    UpdateUserDetail : (data , id) =>  request.post("/users/update" , data),
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
    UpdateDataCategory :  (data , id) =>  request.post("/categories/update" , data),
    UpdateDataProduct :  (data , id) =>  request.put("/products/"+id , data),
    UpdateDataPage :  (data , id) =>  request.put("/pages/"+id+"" , data),
    UpdateDataContent :  (data) =>  request.post("/contents/update" , data),
    GetAllContents :  (search) =>  request.get("/contents" ,  search),
    GetImage :  (search) =>  request.get("/image/"+search),
    GetAllProducts :  (search) => request.get("/products", {params: search}),
}
