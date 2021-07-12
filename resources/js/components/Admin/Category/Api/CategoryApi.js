import {Request} from "../../../../services/AdminService/Api";

export default class CategoryApi {
    _moduleId = 0;
    get moduleId() {
        return this._moduleId;
    }

    set moduleId(value) {
        this._moduleId = value;
    }

    async call() {
        let params = {
            module: this._moduleId,
        }
        try {
            let response = await Request.GetAllCategory(params);
            return new Promise(resolve => {
                resolve(response);
            })
        } catch (error) {
            return new Promise(reject => {
                resolve(error);
            })
        }


    }


}
