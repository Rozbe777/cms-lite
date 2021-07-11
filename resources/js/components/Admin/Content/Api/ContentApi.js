import Webservice from "../../../../classes/webservice";
import {BASE_URL, TOKEN} from "../../../../services/Type";
import {Request} from "../../../../services/AdminService/Api";
import CategoryApi from "../../Category/Api/CategoryApi";

export default class ContentsApi extends Webservice {

    async create(data){

        try{
            let response = await Request.AddNewContent(data);
            return new Promise((resolve => {
                resolve(response)
            }))
        }catch (error) {
            return new Promise((reject) => {
                reject(error)
            })
        }
    }

    async getAll() {
      try{
          let response = await Request.GetAllContents();
          return new Promise((resolve) => {
              resolve(response);
          })

      }catch (error){
          return new Promise((reject) => {
              reject(error);
          })
      }
    }

}
