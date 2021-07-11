import Webservice from "../../../../classes/webservice";
import {BASE_URL, TOKEN} from "../../../../services/Type";
import $ from "jquery";
import {Request} from "../../../../services/AdminService/Api";

export default class CreateContent extends Webservice {

    // async create() {
    //     let data_token = $('meta[name="csrf-token"]').attr('content');
    //     this.url = `${BASE_URL}contents`;
    //     this.body = {
    //         _token: data_token,
    //     }
    //     try {
    //         let response = await this.call();
    //         let responseJson = await response.json();
    //         return new Promise((resolve, reject) => {
    //             resolve(response);
    //         });
    //     } catch (e) {
    //         return new Promise((resolve, reject) => {
    //             reject(e);
    //         });
    //     }
    // }


    create(data) {
        let _token = TOKEN;
        Request.AddNewContent(data)
            .then(response => {
                return new Promise((resolve, reject) => {
                    resolve(response);
                })
            }).catch(error => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        })
    }

}
