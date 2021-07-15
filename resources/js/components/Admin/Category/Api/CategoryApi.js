import {Request} from "../../../../services/AdminService/Api";

export default class CategoryApi {
    _moduleId = 0
    _categoryIds;

    get moduleId() {
        return this._moduleId;
    }

    set moduleId(value) {
        this._moduleId = value;
    }

    get categoryIds() {
        return this._categoryIds;
    }

    set categoryIds(value) {
        this._categoryIds = value;
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
                reject(error);
            })
        }
    }

    async delete() {
        let params = {
            categoryIds: this._categoryIds
        }
        try {
            let response = await Request.GroupDelCategory(params);
            return new Promise(resolve => {
                resolve(response)
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }

    async create(data) {
        let response = await Request.AddNewCategory(data);
        try {
            return new Promise(resolve => {
                resolve(response)
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }
    async edit(data){
        let response = await Request.UpdateDataCategory(data);
        try{
            return new Promise(resolve => {
                return resolve(response)
            })
        }catch (e) {
            return new Promise((reject => {
                return reject(e)
            }))
        }
    }

}
