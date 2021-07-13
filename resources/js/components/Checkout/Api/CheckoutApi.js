import {Request} from "../../../services/FrontService/Api";

export class CheckoutApi{

    _storeData;


    set storeData(data){
        this._storeData = data;
    }
    get storeData(){
        return this._storeData;
    }


    async store(){
        try {
            let response = await Request.storeCheckoutUserInfo(this._storeData)
            return new Promise(resolve => {
                resolve(response);
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }
}
