import {Request} from "../../../services/FrontService/Api";
import {TOKEN} from "../../../services/Type";

export class CheckoutApi {

    _storeData;
    _userMobile;
    _mobileToken;

    set userMobile(mobile) {
        this._userMobile = mobile;
    }

    get userMobile() {
        return this._userMobile;
    }

    set storeData(data) {
        this._storeData = data;
    }

    get storeData() {
        return this._storeData;
    }

    set mobileToken(token){
        this._mobileToken = token;
    }

    get mobileToken(){
        return this._mobileToken
    }


    async store() {
        try {
            let response = await Request.storeCheckoutUserInfo(this._storeData)
            return new Promise(resolve => {
                resolve(response);
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }

    async verifyMobile(){
        let params = {
            _token : TOKEN,
            mobile : this._userMobile
        }
        try{
            let response = await Request.storeUserMobile(params);
            return new Promise(resolve => {
                resolve(response);
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }

    async verifyMobileToken(){
        let params = {
            _token : TOKEN,
            mobile : this._userMobile,
            token : this._mobileToken
        }

        console.log(params)
        try{
            let response = Request.verifyUserMobileToken(params);
            return new Promise(resolve => {
                resolve(response);
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e)
            })
        }
    }
}
