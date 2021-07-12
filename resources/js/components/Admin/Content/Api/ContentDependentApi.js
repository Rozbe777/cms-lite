import {Request} from './../../../../services/AdminService/Api'
export default class ContentDependentApi {
    async getCategory(){

        try{
            let response = await Request.GetAllCategory();
            return new Promise((resolve) => {
                resolve(response);
            })
        }catch (error) {
            return new Promise((reject) => {
                reject(error);
            })
        }
    }

    async getImageUrl(imgName){
        try{
            let response = await Request.GetImage(imgName);
            return new Promise(resolve => {
                resolve(response)
            })
        }catch (error) {
            return new Promise(reject => {
                reject(error);
            })
        }
    }
}
